# Installing a Validator

## 1. Install Tachyon and Solana tools

Following the [installation guide](../getting-started/installation) to install Tachyon and the solana tools.

## 2. Optimize Your System (Linux)

Your system needs proper tuning to ensure smooth operation. Without these settings, your validator might not start.

> Run the following command to configure system settings:

```sh
sudo bash -c "cat >/etc/sysctl.d/21-tachyon-validator.conf <<EOF
# Increase UDP buffer sizes
net.core.rmem_default = 134217728
net.core.rmem_max = 134217728
net.core.wmem_default = 134217728
net.core.wmem_max = 134217728

# Increase memory-mapped files limit
vm.max_map_count = 1000000

# Increase the number of allowed open file descriptors
fs.nr_open = 1000000
EOF"

sudo sysctl -p /etc/sysctl.d/21-tachyon-validator.conf
sudo systemctl daemon-reload

sudo bash -c "cat >/etc/security/limits.d/90-tachyon-nofiles.conf <<EOF
# Increase process file descriptor limit
* - nofile 1000000
EOF"
```

---

## 3. Generate Key Pairs

Use `solana-keygen` to create your keys. Save your 12-word recovery phrase securely.

> Run the following command to create key pairs:

```sh
solana-keygen new --no-passphrase -o ~/.config/solana/identity.json
solana-keygen new --no-passphrase -o ~/.config/solana/vote.json
solana-keygen new --no-passphrase -o ~/.config/solana/stake.json
```

---

## 4. Create a Validator Startup Script

Choose the type of node you want to run: **Validator** or **RPC**.

> Run the following command to create a startup script:

:::tabs key:node
== Validator Node

```shell [Validator Node]
mkdir -p ~/bin
cat > ~/bin/validator.sh <<EOF
#!/bin/bash
exec tachyon-validator \
    --identity ~/.config/solana/identity.json \
    --vote-account ~/.config/solana/vote.json \
    --known-validator Abt4r6uhFs7yPwR3jT5qbnLjBtasgHkRVAd1W6H5yonT \
    --known-validator 5NfpgFCwrYzcgJkda9bRJvccycLUo3dvVQsVAK2W43Um \
    --known-validator FcrZRBfVk2h634L9yvkysJdmvdAprq1NM4u263NuR6LC \
    --only-known-rpc \
    --log ./validator.log \
    --ledger ./ledger \
    --rpc-port 8899 \
    --full-rpc-api \
    --dynamic-port-range 8000-8030 \
    --entrypoint entrypoint1.testnet.x1.xyz:8001 \
    --entrypoint entrypoint2.testnet.x1.xyz:8000 \
    --entrypoint entrypoint3.testnet.x1.xyz:8000 \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size 50000000 \
    --enable-rpc-transaction-history \
    --enable-extended-tx-metadata-storage \
    --rpc-pubsub-enable-block-subscription \
    --full-snapshot-interval-slots 5000 \
    --maximum-incremental-snapshots-to-retain 10 \
    --maximum-full-snapshots-to-retain 50
EOF
chmod +x ~/bin/validator.sh
```

== RPC Node

```shell [RPC Node]
mkdir -p ~/bin
cat > ~/bin/validator.sh <<EOF
#!/bin/bash
exec tachyon-validator \
    --identity ~/.config/solana/identity.json \
    --no-voting \
    --known-validator Abt4r6uhFs7yPwR3jT5qbnLjBtasgHkRVAd1W6H5yonT \
    --known-validator 5NfpgFCwrYzcgJkda9bRJvccycLUo3dvVQsVAK2W43Um \
    --known-validator FcrZRBfVk2h634L9yvkysJdmvdAprq1NM4u263NuR6LC \
    --only-known-rpc \
    --log ./validator.log \
    --ledger ./ledger \
    --rpc-port 8899 \
    --full-rpc-api \
    --dynamic-port-range 8000-8030 \
    --entrypoint entrypoint1.testnet.x1.xyz:8001 \
    --entrypoint entrypoint2.testnet.x1.xyz:8000 \
    --entrypoint entrypoint3.testnet.x1.xyz:8000 \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size 50000000 \
    --enable-rpc-transaction-history \
    --enable-extended-tx-metadata-storage \
    --rpc-pubsub-enable-block-subscription \
    --full-snapshot-interval-slots 5000 \
    --maximum-incremental-snapshots-to-retain 10 \
    --maximum-full-snapshots-to-retain 50
EOF
chmod +x ~/bin/validator.sh
```

:::

---

## 5. Create a Systemd Service

> Run the following command to create a system service:

```sh
cat > /etc/systemd/system/tachyon-validator.server <<EOF
[Unit]
Description=x1-testnet Validator
After=syslog.target network.target

[Service]
User=ubuntu
Group=ubuntu
Environment=RUST_LOG=solana_metrics=warn,info
Type=simple
LimitNOFILE=1000000

KillMode=process
KillSignal=SIGINT
TimeoutStopSec=600
Restart=on-failure
RestartSec=10s
SyslogIdentifier=tachyon-validator
ExecStart=/home/ubuntu/bin/validator.sh

[Install]
WantedBy=multi-user.target
EOF
```

## 6. Configure log rotation

> Run the following command to configure log rotation:

```sh
cat > /etc/logrotate.d/tachyon-validator <<EOF
/home/ubuntu/validator.log {
    rotate 3
    daily
    compress
    maxsize 1G
    missingok
    postrotate
      systemctl kill -s USR1 tachyon-validator.service
    endscript
    create 0644 ubuntu ubuntu
}
EOF
```

## 7. Start the Validator

> Run the following command to start the validator and enable it on boot:

```sh
sudo systemctl enable --now tachyon-validator
```

---

Your validator is now operational.

::: tip
You must now stake your tokens to participate as a validator.
:::
