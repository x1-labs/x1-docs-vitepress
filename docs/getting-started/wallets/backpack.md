---
title: Importing a Keypair into Backpack Wallet
description: Learn how to import a Solana keypair into the Backpack wallet and connect to the X1 testnet.
next:
  link: /operating-a-validator/
  text: Operating a Validator
---

# Importing a Keypair into Backpack Wallet

Backpack Wallet is a secure, user-friendly wallet for managing Solana-based assets. Follow these steps to import your keypair and connect to the X1 testnet.

## Step 1: Install Backpack

Download and install the [Backpack wallet extension](https://www.backpack.app/) for your browser.

## Step 2: Retrieve Your Private Key

1. Open a terminal.
2. Run the following command to display your private key:
   ```sh
   cat ~/.config/solana/id.json
   ```
3. Copy the private key for the next step.

## Step 3: Import into Backpack

1. Open Backpack Wallet.
2. Navigate to Wallet → Add New Solana Wallet → Private Key.
3. Paste your private key and confirm the import.

## Step 4: Enable Developer Mode & Switch to X1 Testnet

1. Open Backpack settings.
2. Enable Developer Mode.
3. Change the RPC URL to:

```sh
https://rpc.testnet.x1.xyz
```
