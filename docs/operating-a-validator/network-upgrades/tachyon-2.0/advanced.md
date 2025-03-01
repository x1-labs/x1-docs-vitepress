# **Guide to Migrating the X1 Testnet Chain to v2.0**

Validators should see the [v2.0 Testnet Restart](README.md) guide for validator migration instructions.

This guide details the steps taken to migrate the X1 Testnet Chain to v2.0 to document
the process for future reference.

**Do not preform these steps.**

On the bootstrap node, the following steps were taken to migrate the X1 Testnet Chain to v2.0:

1. Install Tachyon v2.0
2. Stop the Validator
3. Set Environment Variables:
   ```bash
   export PARENT_DIRECTORY=/data/x1-testnet
   export LEDGER_PATH=$PARENT_DIRECTORY/ledger
   export ACCOUNTS_PATH=$PARENT_DIRECTORY/accounts
   export SNAPSHOTS_PATH=$PARENT_DIRECTORY/snapshots
   export VOTE_ACCOUNT_KEYPAIR=/var/lib/x1/vote-account-keypair.json
   ```
4. Backup the keys and ledger data
   ```bash
   rsync -av $PARENT_DIRECTORY/ $PARENT_DIRECTORY.bak/
   ```
5. Create a snapshot using solana-ledger-tool with a Hard Fork: deactivate the development feature gates & deactivate all other stake accounts.
   ```bash
   export SLOT_X=$(tachyon-ledger-tool --output json-compact --ledger $LEDGER_PATH latest-optimistic-slot | tail -1 | awk '{print $1}')
   export VOTE_ADDRESS=$(solana address -k "$VOTE_ACCOUNT_KEYPAIR")
   export OTHER_STAKERS=$(solana --url https://rpc.testnet.x1.xyz validators --output json-compact | jq -r '.validators[].voteAccountPubkey' | grep -v "$VOTE_ADDRESS" | xargs xargs -0 printf "--destake-vote-account %s ")
   snapshot_output=$(tachyon-ledger-tool create-snapshot $SLOT_X \
      --ledger $LEDGER_PATH \
      --incremental-snapshot-archive-path $SNAPSHOTS_PATH \
      --snapshots $SNAPSHOTS_PATH \
      --hard-fork $SLOT_X \
      --destake-vote-account $OTHER_STAKERS \
      --warp-slot $(($SLOT_X+1001)) \
      --enable-capitalization-change \
      --deactivate-feature-gate \
        tvcF6b1TRz353zKuhBjinZkKzjmihXmBAHJdjNYw1sQ decoMktMcnmiq6t3u7g5BfgcQu91nKZr6RvMYf9z1Jb 7uZBkJXJ1HkuP6R3MJfZs7mLwymBcDbKdqbF51ZWLier HFpdDDNQjvcXnXKec697HDDsyk6tFoWS2o8fkxuhQZpL 2KKG3C6RBnxQo9jVVrbzsoSh41TDXLK7gBc9gduyxSzW 2ry7ygxiYURULZCrypHhveanvP5tzZ4toRwVp89oCNSj 3sioPumDoSRarqzp442ETGUvTCLADgU9eFzKJj375B23 41tVp5qR1XwWRt5WifvtSQyuxtqQWJgEK8w91AtBqSwP 5TuppMutoyzhUSfuYdhgzD47F92GL1g89KpCZQKqedxP 8aXvSuopd1PUj7UhehfXJRg6619RHp8ZvwTyyJHdUYsj 8oBxsYqnCvUTGzgEpxPcnVf7MLbWWPYddE33PftFeBBd 9LZdXeKGeBV6hRLdxS1rHbHoEUsKqesCC2ZAPTPKJAbK 9onWzzvCzNC2jfhxxeqRgs5q7nFAAKpCUvkj6T6GJK9i BeCY6VL4CKQR2QUwe9w3iRtNMN91FMW1sXbRzwfc3WYc CJzY83ggJHqPGDq8VisV3U91jDJLuEaALZooBrXtnnLU DT4n6ABDqs6w4bnfwrXT9rsprcPf6cdDga1egctaPkLC EBq48m8irRKuE7ZnMTLvLg2UuGSqhe8s8oMqnmja1fJw EaQpmC6GtRssaZ3PCUM5YksGqUdMLeZ46BQXYtHYakDS EenyoWx9UMXYKpR8mW5Jmfmy2fRjzUtM7NduYMY8bx33 G6ANXD6ptCSyNd9znZm7j4dEczAJCfx7Cy43oBx3rKHJ GDH5TVdbTPUpRnXaRyQqiKUa7uZAbZ28Q2N9bhbKoMLm Gz1aLrbeQ4Q6PTSafCZcGWZXz91yVRi7ASFzFEr1U4sa HTW2pSyErTj4BV6KBM9NZ9VBUJVxt7sacNWcf76wtzb3 capRxUrBjNkkCpjrJxPGfPaWijB7q3JoDfsWXAnt46r chaie9S2zVfuxJKNRGkyTDokLwWxx6kD2ZLsqQHaDD8 qywiJyZmqTKspFg2LeuUHqcA5nNvBgobqb9UprywS9N wLckV1a64ngtcKPRGU4S4grVTestXjmNjxBjaKZrAcn zk1snxsc6Fh3wsGNbbHAJNHiJoYgF29mMnTSusGx5EJ zkNLP7EQALfC1TYeB3biDU7akDckj8iPkvh9y2Mt2K3 zkiTNuzBKxrCLMKehzuQeKZyLtX2yvFcEKMML8nExU8)QQ
   echo $snapshot_output
   export SLOT_X=$(echo $snapshot_output | awk '{print $8}')
   export BANK_HASH=$(echo $snapshot_output | awk '{print $16}' | sed 's/:$//')
   ```
6. Modify the Genesis to switch the cluster type from `development` to `testnet`
   ```bash
   tachyon-ledger-tool modify-genesis --ledger $LEDGER_PATH \
     --cluster-type testnet /tmp/modify-tachyon-genesis/
   rsync -av /tmp/modify-tachyon-genesis/ $LEDGER_PATH/
   rsync -av /tmp/modify-tachyon-genesis/rocksdb/ $LEDGER_PATH/rocksdb/
   export SHRED_VERSION=$(tachyon-ledger-tool --ledger $LEDGER_PATH shred-version)
   echo export SLOT_X=$SLOT_X;
   echo export BANK_HASH=$BANK_HASH;
   echo export SHRED_VERSION=$SHRED_VERSION
   ```
7. Update Startup Config
   ```bash
   tachyon-validator \                       # <-- Update the binary name from solana-validator to tachyon-validator.
   --wait-for-supermajority $(($SLOT_X + 1)) \   # <-- NEW! IMPORTANT! REMOVE AFTER THIS RESTART
   --expected-shred-version $SHRED_VERSION \          # <-- NEW! IMPORTANT! REMOVE AFTER THIS RESTART
   --expected-bank-hash $BANK_HASH   # <-- NEW! IMPORTANT! REMOVE AFTER THIS RESTART
   ...
   ```
   ⚠️ **Warning**: You might encounter an error related to a mismatch in the shred version. If this happens, note the reported shred version and update the --expected-shred-version argument with the correct value.

## **Next Steps**

Once the validator starts, monitor the logs for block processing and ensure the validator is running correctly.
Announce the restart on Telegram and provide instructions for other validators to update their nodes.

Don't forget to remove the `--wait-for-supermajority`, `--expected-shred-version`, and `--expected-bank-hash` arguments after the restart.
