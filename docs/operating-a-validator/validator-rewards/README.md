---
description: The various ways to make rewards as a validator on X1
---

# Validator rewards

- Voting rewards from inflation
- Commission from delegators
- Block rewards from block production
- Bootstrap bonus

<figure><img src="../../../.gitbook/assets/image%20(14).png" alt=""><figcaption><p>X1 Validator Financials</p></figcaption></figure>

## Voting rewards from inflation

In the X1 consensus mechanism, validators cast votes on blocks proposed by the leader. Throughout each epoch, validators accumulate credits for their votes, which can be exchanged for a portion of the epoch's inflation rewards. The inflation rewards are allocated based on the number of credits each validator earns during the epoch; a validator's percentage of the total credits determines their share of the inflation rewards. This share is then adjusted according to the validator's stake relative to the total staked amount.

X1 also features a predefined inflation schedule. It begins at 8% and decreases annually by 15%, aiming for a long-term inflation rate of 1.5%.

## Commission from delegators

X1 operates on a delegated proof-of-stake (dPoS) blockchain system. Holders of the XN cryptocurrency can delegate their coins to a validator, increasing that validator's staking weight. This not only enhances the validator's potential rewards from inflation through increased voting power but also boosts their chances of being selected as the leader to earn block rewards. Validators set their own commission rates, typically around 10%, which they deduct from the inflationary voting rewards; the remaining rewards are distributed to the stakers.

## Block rewards from block production

Transaction fees on the network are awarded to the leader who successfully produces a block. High-performing nodes have a greater chance of being selected as the leader. RPC forwards transactions to the leader for execution. If the leader manages to produce a block that is confirmed by over two-thirds (67%) of the validator cluster, weighted by stake and performance([with ACP on the roadmap](../../core-concepts/technical-roadmap/stake-performance-and-randomness-based-leader-selection.md)), they receive the block rewards, which consist of the transaction fees paid by the network's users for that block.

## Bootstrap bonus

To support the growth of the network's infrastructure, validators receive additional incentives through a bootstrap program. Eligibility for the bootstrap bonus requires meeting specific criteria. The distribution of the bootstrap bonus for each epoch is determined by a validator's score, which is based on a credit system. \[TBA]

## Validator costs

The only direct cost for validators is the hardware expense, which varies depending on the server supplier. To learn more, please read about the [hardware requirements](../performance/hardware-requirements.md) for the X1 blockchain.

A major differentiator from Solana is that validators on the X1 Blockchain don't pay for votes. This significantly lowers the barriers to starting and maintaining a validator. Read more about[ zero-cost votes](../../core-concepts/zero-cost-votes.md).
