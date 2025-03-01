# **Guide to Migrating the X1 Testnet Chain to v2.0**

## **Quick Overview**

| **Attribute**         | **Value**                                      |
| --------------------- | ---------------------------------------------- |
| **Validator Version** | `tachyon-validator: v2.0.21`                   |
| **Restart Slot**      | `48853558`                                     |
| **Shred Version**     | `41710`                                        |
| **Bank Hash**         | `BNd9PkMbZmEHGeErE6amj9Fb3phG5BsPH4FFbQfa2dVx` |

During the restart and migration to v2.0, the testnet will undergo a fork.
A new snapshot and genesis will be created, and the network will restart using the updated version.

To streamline the process, all stake accounts will be deactivated, requiring stakers to re-delegate their accounts upon rejoining the network.
Rest assured, the original stake amounts will be preserved.

Follow the steps below to migrate your validator to v2.0.

---

## **Step 1: Install Tachyon v2.0**

You will need Tachyon v2.0 to generate the correct snapshot.

1. Clone the Tachyon repository:
   ```bash
   git clone https://github.com/x1-labs/tachyon.git
   ```
2. Build the repository:
   ```bash
   cd tachyon
   cargo build --release
   ```
3. Update your `PATH` environment variable:

   > Replace `/path/to/tachyon` with the correct path. Use `pwd` to get your current directory path.

   ```bash
   export PATH=$PATH:/path/to/tachyon/target/release
   ```

   📌 **Tip**: Add this line to your `~/.bashrc` or `~/.zshrc` to make the change permanent.

4. Verify the installation:
   ```bash
   tachyon-validator --version
   ```
   > You should see the following output:
   ```
   tachyon-validator 2.0.21 (src:00000000; feat:2908148756, client:Tachyon)
   ```

---

## **Step 2: Stop the Solana Validator**

If your validator is still running, stop it before proceeding.

---

## **Step 3: Backup Your Data and Remove the Old Ledger**

1. **Backup your keys** 🗝️: Save your validator keys in a secure location.

2. Backup or remove your old ledger directory:

   - If you have sufficient disk space, keep the old ledger as a backup.
   - Otherwise, you can delete it to free up space.

   > **Note**: Replace paths with your actual ledger directory and backup location.

   ```bash
   # Move the ledger to a backup location
   mv /home/ubuntu/ledger /path/to/backup/location

   # Or delete the ledger
   rm -rf /home/ubuntu/ledger
   ```

---

## **Step 4: Update Startup Configuration**

1. Update the binary name in your startup script:
   > Rename from solana-validator to tachyon-validator
   ```bash
    tachyon-validator
   ```

See the example start script [here](https://docs.x1.xyz/validating/create-a-read-only-node#id-7.-create-a-validator-startup-script-and-start-node).

## **Step 5: Start your validator**

1. Start your validator using the updated configuration.

2. Make sure your validator is in sync with the network:
   ```bash
   solana catchup --our-localhost
   ```
   You should see the following output:
   ```
   XXXXXXXXXXXXXXXXXXXXXXXXXX has caught up (us:XXXXXXXX them:XXXXXXXX)
   ```

---

## **Step 6: Re-delegate Your Stake**

⚠️ **Warning**: Do not re-delegate your stake accounts until you're fully synced with the network.

After the restart, you will need to re-delegate your stake accounts. Your original stake amounts will be preserved.

> **Note**: Replace paths with the correct paths to your identity, stake, and vote account files.

```bash
solana -k ~/identity.json delegate-stake ~/stake-account.json ~/vote-account.json
```

📌 **Tip**: Your stake will take a few epochs to activate and gradually grow to its full amount.

---

## **Next Steps**

- Check the logs to ensure your validator is running correctly.
- Use the `solana validators` command to verify your validator's status.
- Monitor the network and assist others during the migration process.

## Bootstrap Fork Instructions

See the [Advanced Guide](advanced.md) for the exact steps that will be taken to migrate
the X1 Testnet Chain to v2.0 on the bootstrap node. These steps will be executed by the X1 team.
