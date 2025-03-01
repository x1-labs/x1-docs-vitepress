---
description: >-
  First create a read-only node and then continue with below steps. To turn the
  read-only node into a validator node you need to fund your identity account
  and create vote and stake accounts.
---

# Create a validator node

### Fund identity account

<figure><img src="../../.gitbook/assets/id-identiy.png" alt=""><figcaption></figcaption></figure>

```sh
solana transfer identity.json 10 --allow-unfunded-recipient
```

Check balance:

```sh
solana balance identity.json
```

### Create vote account

<figure><img src="../../.gitbook/assets/voter-creation.png" alt=""><figcaption></figcaption></figure>

{% code overflow="wrap" %}

```sh
solana create-vote-account vote.json identity.json  <WITHDRAWER_PUBKEY> --commission 10
```

{% endcode %}

Creates a vote account with vote.json keypair + identity.json as identity + the withdrawer address and commission.

\--commission: If you get a delegation then anything they make you get 10%.

Check vote account:

```sh
solana vote-account <vote pubkey>
```

### Create and fund stake account

```sh
solana create-stake-account stake.json 10
```

Check stake account:

```sh
solana account stake.json
```

### Stake

<figure><img src="../../.gitbook/assets/stake.png" alt=""><figcaption></figcaption></figure>

Do delegate stake operation:

```sh
solana delegate-stake stake.json vote.json
```

Check condition of a stake:

```sh
solana stake-account stake.json
```

## Check validator

See validators. Your identity.json should show up there:

```sh
solana validators
```

Monitor ledger, is continuous monitoring:

```sh
tachyon-validator --ledger ledger/ monitor
```

Block production, see skipped slots:

```sh
solana block-production
```

Check leader schedule:

```sh
solana leader-schedule
```

or:

```sh
tail -f nohup.out | grep -i "My next leader slot"
```

Check block production:

```sh
solana block-production
```

Check epoch information:

```sh
solana epoch-info
```

Check CPU and memory:

```sh
top
```

Type (shift+h). CPU should be lower than 100% with margin.&#x20;

```sh
htop
```

Check validator process:

```sh
ps aux | grep validator
```

Kill validator process:

```sh
tachyon-validator exit -f
```
