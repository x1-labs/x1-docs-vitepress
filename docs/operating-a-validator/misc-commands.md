# Misc commands

## Register validator with name, website and icon

See list of registered validators:

```sh
solana validator-info get
```

Set to you identity.json keypair:

```sh
solana config set -k identity.json
```

Publish your validator information:

{% code overflow="wrap" %}

```sh
solana validator-info publish "Validator name" -w "website" -i "icon URL" -k path/<identity keypair>
```

{% endcode %}

Note "-k" at the end which points to your identify.json including its path. This links your validator identity to the information you are providing. Your icon needs to be hosted.&#x20;

Example:

{% code overflow="wrap" %}

```sh
solana validator-info publish "Jack's Ryzen Test Node" -w "https://x1.xyz" -i "https://x1.xyz/ryzen.jpg" -k .config/solana/identity.json
```

{% endcode %}

See validator info for specific validator:

```sh
solana validator-info get <Info address>
```

## Supply information

Get Xolana supply (l for localnet):

```sh
solana -ul supply
```

Get Solana Supply (m for mainnet):

```sh
solana -um supply
```

Get stake history (shows stake history for 10 last epochs):

```sh
solana -ul stake-history
```

Epoch info:

```sh
solana epoch-info
```

Block production % per epoch

{% embed url="http://xolana.xen.network:3232/api/epochs" %}
