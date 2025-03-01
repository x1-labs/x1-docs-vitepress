---
description: >-
  Running Pinger allows the validator to share leader data transmission times with the network.
---

# Ping Validator

## Why Use Pinger?

When an RPC receives a transaction message to be included in a block, it must forward the message to the leader. Fast data transmission to the leader is crucial for network efficiency and consensus speed.

<figure><img src="../../../.gitbook/assets/image%20(13).png" alt=""><figcaption><p>Data forwarding from RPCs/validators to the leader</p></figcaption></figure>

Monitoring your validator's ping times ensures it meets leader schedule performance requirements.

## Pinger Dashboard

<figure><img src="../../../.gitbook/assets/Screenshot%202024-09-02%20at%2019.09.50.png" alt=""><figcaption><p>X1 Validator Dashboard with Ping Times</p></figcaption></figure>

{% embed url="http://x1val.online/" %}

Ping times measure how long it takes for your validator to communicate with the current leader. Since the leader changes every four slots (1.6s), ping time variance (typically 500–3000ms) depends on the distance to the constantly switching leader.

## Installation

{% embed url="https://github.com/x1-labs/x1-pinger/" %}

### Configure Keypair

```sh
solana config set -k ~/.config/solana/id.json
```

_Ensure the keypair has funds, as a transaction is sent with each ping._

### Open Firewall Port (If Enabled)

Enable UFW if it is not already enabled:

```sh
sudo ufw enable
```

Allow traffic on port **3334**:

```sh
sudo ufw allow 3334/tcp
```

### Install and Run Pinger

```sh
# Update and install dependencies
sudo apt update
sudo apt install -y nodejs jq

# Clone the Pinger repository
git clone https://github.com/x1-labs/x1-pinger/
cd pinger
npm install

# Set up the system service
cp system/x1-pinger.service /etc/systemd/system/x1-pinger.service

# If installed in a different directory, update the service file accordingly
# nano /etc/systemd/system/x1-pinger.service

# Enable and start the service
sudo systemctl enable --now x1-pinger
```

### Verify Installation

Check the service status:

```sh
sudo systemctl status x1-pinger
```

View logs to ensure correct operation:

```sh
journalctl -u x1-pinger -f
```

<figure><img src="../../../.gitbook/assets/Screenshot%202024-09-02%20at%2020.23.58.png" alt=""><figcaption></figcaption></figure>

Once running, your validator will continuously measure and share leader ping times.

## Managing Pinger

### Stop the Pinger

```sh
sudo systemctl stop x1-pinger
```

### Retrieve Ping Metrics

```sh
curl http://localhost:3334/ping_times | jq
```

<figure><img src="../../../.gitbook/assets/Screenshot%202024-09-09%20at%2010.26.45%20(1).png" alt=""><figcaption></figcaption></figure>

You can also check your ping times on **x1val.online**:

{% embed url="http://x1val.online/" %}
