---
title: Installation from Source
description: Step-by-step guide to installing Rust, Solana tools, and Tachyon v2.0 on your local machine.
---

# Installation from Source

This guide walks you through installing the Solana (X1) tools and Tachyon from source.

:::: details See notes for Windows users
For Windows:
Download and install the Build Tools for Visual Studio (2019 or later) from the Visual Studio downloads page. Make sure to include the C++ build tools in the installation.
Install LLVM: Download and install LLVM from the official LLVM download page.
Install Protocol Buffers Compiler (protoc): Download protoc from the GitHub releases page of Protocol Buffers, and add it to your PATH.
::: info
Users on Windows 10 or 11 may need to install Windows Subsystem for Linux (WSL) in order to be able to build from source. WSL provides a Linux environment that runs inside your existing Windows installation. You can then run regular Linux software, including the Linux versions of Solana CLI.

After installed, run wsl from your Windows terminal, then continue through the Debian and Other Linux Distributions below.
:::
::::

### 1. Install dependencies
:::tabs key:os
=== Linux
```shell
sudo apt update -y
sudo apt install -y curl \
                    git \
                    libssl-dev \
                    libudev-dev \
                    pkg-config \
                    zlib1g-dev \
                    llvm \
                    clang \
                    cmake \
                    make \
                    libprotobuf-dev \
                    protobuf-compiler
```

=== Mac
```shell
brew install openssl
brew install protobuf
```
:::


### 2. Install Rust
```shell
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup component add rustfmt
```


### 3. Clone the Tachyon repository and Build
```shell
git clone https://github.com/x1-labs/tachyon.git
cd tachyon
cargo build --release
```


### 4. Update your PATH (Bash)
:::tabs key:os
=== Linux
> Update your PATH (Bash)
```shell
export PATH=$PATH:$(pwd)/target/release
echo "export PATH=$PATH:$(pwd)/target/release" >> ~/.bashrc
```

=== Mac
> Update your PATH (Zsh)
```shell
export PATH=$PATH:$(pwd)/target/release
echo "export PATH=$PATH:$(pwd)/target/release" >> ~/.zshrc
```
:::
