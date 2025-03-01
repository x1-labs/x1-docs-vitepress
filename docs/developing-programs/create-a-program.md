---
title: Creating Programs
description: Basic setup for creating programs on X1 with Anchor
---

# Creating Programs on X1 with Anchor

Easily set up your local development environment for X1.

::: tip
Alternatively, you can use the [Solana Playground](https://beta.solpg.io/) and configure the settings to set a custom endpoint URL: https://rpc.testnet.x1.xyz.
:::

## Quick Installation

For Linux users, install all dependencies with a single command:

```sh
curl --proto '=https' --tlsv1.2 -sSfL https://gist.githubusercontent.com/nibty/fa80eb1d0587dd96868b3d9df17def6e/raw/5a256777d3631ed91770e33f0f23fb91e6a013ea/x1-development.sh | bash
```

Expected output:

```
Installed Versions:
Rust: rustc 1.84.1 (e71f9a9a9 2025-01-27)
Solana CLI: solana-cli 2.0.26 (src:3dccb3e7; feat:607245837, client:Agave)
Anchor CLI: anchor-cli 0.30.1
Node.js: v23.7.0
Yarn: 1.22.1
```

If this does not work, install each dependency manually using the steps below.

::: details See Manual Installation

## Install Required Libraries

> Update and install dependencies:

```sh
sudo apt-get update && sudo apt-get upgrade -y \
    && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev npm
```

> Install yarn globally:

```sh
sudo npm install -g yarn
```

## Install Solana CLI (Linux)

The Solana CLI enables building and deploying programs.

```sh
sh -c "$(curl -sSfL https://release.x1.xyz/stable/install)"
```

To ensure the installation is recognized, add Solana CLI to your `PATH`:

```sh
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

Verify installation:

```sh
solana --version
```

To update Solana CLI:

```sh
tachyon-install update
```

## Generate a Keypair

Create a new wallet and save the 12-word seed phrase securely:

```sh
solana-keygen new --no-passphrase -o ~/.config/solana/id.json
solana config set -k ~/.config/solana/id.json
```

## Install Rust and Cargo

```sh
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup update
cargo -V
```

For Linux users, install additional dependencies:

```sh
sudo apt-get update && sudo apt-get install -y \
    libssl-dev libudev-dev pkg-config zlib1g-dev llvm clang cmake make \
    libprotobuf-dev protobuf-compiler
```

[Official Rust Installation Guide](https://www.rust-lang.org/tools/install)

## Install Anchor

Install **avm** using Cargo:

```sh
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

Install and set the latest Anchor version:

```sh
avm install latest
avm use latest
```

Verify installation:

```sh
anchor --version
```

[Anchor Installation Guide](https://www.anchor-lang.com/docs/installation)

## Creating and Deploying an Anchor Program

### Initialize a New Project

```sh
anchor init <project-name>
cd <project-name>
```

### Configure Anchor

Display the `Anchor.toml` file:

```sh
cat Anchor.toml
```

Modify `Anchor.toml` to use X1 Testnet:

```sh
nano Anchor.toml
```

Change `localnet` to:

```toml
[provider]
cluster = "https://rpc.testnet.x1.xyz"
```

Set Solana CLI to X1 Testnet:

```sh
solana config set -u https://rpc.testnet.x1.xyz
solana config get
```

:::

### Fund Your Wallet

Use the [X1 Testnet Faucet](https://faucet.testnet.x1.xyz/) to get test tokens. Verify balance:

```sh
solana balance
```

### Build and Deploy the Program

```sh
anchor build
anchor test
```

### Confirm Transaction

```sh
solana confirm -v <tx-hash>
```

Or check on the [X1 Explorer](https://explorer.x1.xyz/).

### Modify Your Program

```sh
cd programs/<project-name>/src
nano lib.rs
```

After modifications, return to the root project directory and rebuild/deploy the program.

### Handling Errors

If you encounter **"instruction 0: account data too small for instruction"**, increase the byte size:

```sh
solana program extend <program-id> 15000
```

## Additional Resources

[YouTube Tutorial](https://www.youtube.com/watch?v=gnDzOPK8jMc&t)
