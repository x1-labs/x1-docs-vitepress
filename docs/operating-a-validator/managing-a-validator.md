# Managing a Validator

## System Service

> Disable the service from starting on boot

```sh
sudo systemctl disable tachyon-validator
```

> Start the service

```sh
sudo systemctl start tachyon-validator
```

> Check the service status

```sh
sudo systemctl status tachyon-validator
```

## Logs

> View the validator logs

```sh
tail -f /home/ubuntu/validator.log
```

> If you encounter any issues, check the service logs for errors.

```sh
sudo journalctl -t tachyon-validator -f
```

> To check synchronization status:

```sh
solana catchup --our-localhost
```

## Monitor Node Performance

> Monitor you validator

```sh
tachyon-validator --ledger ./ledger monitor
```

> See all network-connected nodes:

```sh
solana gossip
```

> See all validators:

```sh
solana validators
```

---
