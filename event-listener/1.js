"use strict";
// this file is just for reference
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var moralis_1 = require("moralis");
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var webhookData, decodedLogs;
    return __generator(this, function (_a) {
        webhookData = {
            confirmed: true,
            chainId: "0x1",
            abi: [
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "string",
                            name: "value",
                            type: "string"
                        },
                        {
                            indexed: true,
                            internalType: "uint256",
                            name: "id",
                            type: "uint256"
                        },
                    ],
                    name: "URI",
                    type: "event"
                },
            ],
            streamId: "b4dbc80e-8161-43d8-9c5a-05a8a4bba988",
            tag: "URI-listener",
            retries: 0,
            block: {
                number: "15933519",
                hash: "0x192357541e97093ebdf99b4a04e7e33726b6eb01f88f7ab3df3ab2dc5242147c",
                timestamp: "1668009611"
            },
            logs: [
                {
                    logIndex: "475",
                    transactionHash: "0x55125fa34ce16c295c222d48fc3efe210864dc2fb017f5965b4e3743d72342d5",
                    address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
                    data: "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b726569687366326568636c78796d793467366836697163627361346c6961637a6f716b7373666b6e70787535796a356f67696a6f667175000000000000000000000000000000000000000000000000000000000000",
                    topic0: "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b",
                    topic1: "0xab6953e647a36018fc48d6223583597b84c755a0000000000000010000000001",
                    topic2: null,
                    topic3: null
                },
            ],
            txs: [],
            txsInternal: [],
            erc20Transfers: [],
            erc20Approvals: [],
            nftApprovals: { ERC1155: [], ERC721: [] },
            nftTransfers: []
        };
        decodedLogs = moralis_1["default"].Streams.parsedLogs(webhookData);
        console.log(decodedLogs);
        // check the parse data
        console.log(decodedLogs[0].value);
        console.log(decodedLogs[0].id.toString());
        return [2 /*return*/];
    });
}); };
test();
