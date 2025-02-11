# @azguardwallet/types

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
} from "@azguardwallet/types";

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

if (result.kind === "ok") {
    const txHash = (result as OkResult<string>).result;
    // ...
}
else if (result.kind === "failed") {
    const error = (result as FailedResult).error;
    // ...
}
```
