# Operating a X1 Node

X1 nodes are the backbone of the X1 network.
They are responsible for validating transactions and blocks, and for propagating them to other nodes.
This guide will help you get started with running a X1 node.

## Node Type

First, you need to decide which type of node you want to run.

- **RPC Node**: A rpc node provides an API for interacting with the blockchain. This is useful for building applications that interact with the blockchain.
- **Validator Node**: An validator node is a rpc node that participates in consensus and validates transactions and is rewarded with XN.

## Hardware Requirements

The following hardware specifications serve as a guideline. Operators should conduct performance testing to determine optimal configurations.

| Component   | Specification                                         |
| ----------- | ----------------------------------------------------- |
| **CPU**     | 12 cores / 24 threads or more, 3GHz+ base clock speed |
| **RAM**     | 128GB or more                                         |
| **Storage** | 4TB NVMe SSD                                          |
| **Server**  | Bare-metal dedicated server (No VPS)                  |

### Example Server:

[AMD Ryzen 7900X Dedicated Server](https://www.interserver.net/dedicated/amd-ryzen-7900x)

> [!NOTE]
> Hardware requirements are subject to change over time. As the network gains adoption, server costs may increase.
