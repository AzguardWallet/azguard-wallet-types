# @azguardwallet/types

[![GitHub License](https://img.shields.io/github/license/AzguardWallet/azguard-wallet-types)](https://github.com/AzguardWallet/azguard-wallet-types/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@azguardwallet/types)](https://www.npmjs.com/package/@azguardwallet/types)
[![NPM Downloads](https://img.shields.io/npm/dt/@azguardwallet/types)](https://www.npmjs.com/package/@azguardwallet/types)

This library contains type declarations with annotations for Azguard Wallet inpage RPC client, that can be helpful for browser based apps written in TypeScript.

### How to use

Install the package:

```shell
npm install @azguardwallet/types --save-dev
```

And import it somewhere in your codebase:

```ts
import "@azguardwallet/types";
```

After that TS will be aware of `window.azguard` object and all related types.

### Example

```ts
import type {
    CaipAccount,
    CallAction,
    FailedResult,
    OkResult,
    SendTransactionResult,
} from "@azguardwallet/types";

if (!window.azguard) {
    throw "Azguard Wallet is not installed";
}

const azguard = window.azguard.createClient();

const account: CaipAccount = "aztec:31337:0xffff...";

const transferCall: CallAction = {
    kind: "call",
    contract: "0xffff...",
    method: "transfer",
    args: ["0xffff...", 100],
};

const [result] = await azguard.request("execute", {
    sessionId: "1234",
    operations: [
        {
            kind: "send_transaction",
            account: account,
            actions: [transferCall],
        },
    ],
});

if (result.status === "ok") {
    const txHash = (result as OkResult<SendTransactionResult>).result;
    // ...
}
else if (result.status === "failed") {
    const error = (result as FailedResult).error;
    // ...
}
```
