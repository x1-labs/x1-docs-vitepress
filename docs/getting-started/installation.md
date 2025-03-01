---
title: Installation
description: Step-by-step guide to installing Rust, Solana tools, and Tachyon v2.0 on your local machine.
sidebar_position: 1
---

# Installation

This guide walks you through installing the Solana (X1) tools and Tachyon v2.0.

## 1. Install Tachyon v2.0 and Solana tools

X1 uses Solana tools to interact with the network. Tachyon v2.0 is the X1 validator client.

:::tabs key:os

== Linux
> Open a Terminal and run:
```shell
sh -c "$(curl -sSfL https://release.x1.xyz/stable/install)"
```

== Mac
> Open a Terminal and run:
```shell [Mac OS]
sh -c "$(curl -sSfL https://release.x1.xyz/stable/install)"
```

== Windows
> Open a Command Prompt (cmd.exe) as an Administrator and run:
```shell [Windows]
# Open a Command Prompt (cmd.exe) as an Administrator and run:
cmd /c "curl https://release.x1.xyz/stable/tachyon-install-init-x86_64-pc-windows-msvc.exe --output C:\agave-install-tmp\agave-install-init.exe --create-dirs"
C:\agave-install-tmp\agave-install-init.exe v2.2.0
```
:::

::: info
For instructions on building from source, refer to the [Installation from Source](installation-from-source.md) guide.
:::

## 2: Verify the installation

```bash
solana --version
tachyon-validator --version
```

> If you see the versions listed below, the installation was successful:

```
solana-cli 2.0.XX (src:00000000; feat:XXXXXXXXXXXX, client:Tachyon)
tachyon-validator 2.0.XX (src:00000000; feat:XXXXXXXXXXXX, client:Tachyon)
```

## 3: Generate a Solana Keypair

:::tip
Write down your mnemonic seed phrase and keep it safe offline. You will need it to recover your keypair.
:::

```bash
solana-keygen new
```

## 4: Connect to the X1 Testnet

```bash
solana config set --url https://rpc.testnet.x1.xyz
```
