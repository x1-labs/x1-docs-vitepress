# Staking functions

## Stake

Transfer XN to stake account:

```sh
solana transfer <STAKE_PUBKEY> 1000
```

Do delegate stake operation:

```sh
solana delegate-stake stake.json vote.json
```

Check condition of a stake:

```sh
solana stake-account stake.json
```

## Deactivate stake

Get stake account:

```sh
solana account stake.json
```

Deactivate stake:

```sh
solana deactivate-stake <STAKE_PUBKEY>
```

See un-staking progress:

```sh
solana stake-account stake.json
```

## Withdraw stake

```sh
solana withdraw-stake <STAKE_ACCOUNT_ADDRESS> <RECIPIENT_ADDRESS> <AMOUNT>
```

Leave some XN for unstaking fee.&#x20;

## Delegate a stake (to someone else)

#### Create a new stake account

Include the vote account of the one you want to stake to.&#x20;

{% code overflow="wrap" %}

```sh
solana-keygen new --no-passphrase -o ~/.config/solana/stake_<VOTE_PUBKEY>.json
```

{% endcode %}

#### Create stake account on ledger and send XN/SOL to it

```sh
solana create-stake-account stake_<VOTE_PUBKEY>.json 1000
```

#### Delegate stake

```
solana delegate-stake stake_<VOTE_PUBKEY>.json <VOTE_PUBKEY>
```

#### Check stake

```sh
solana stakes <VOTE_PUBKEY>
```

{% hint style="info" %}
You cant ad to an ongoing stake. Either unstake, let the epoch run and stake again or create a new stake account and stake separately without unstaking anything.&#x20;
{% endhint %}
