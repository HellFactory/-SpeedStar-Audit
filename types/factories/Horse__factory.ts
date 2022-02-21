/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Horse, HorseInterface } from "../Horse";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "ChangeBaseURI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
    ],
    name: "UpdateAge",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getPopularity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getRemainAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rarity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "minter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_receiver",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "_uri",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "_tokenId",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_rarity",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_age",
        type: "uint256[]",
      },
    ],
    name: "mints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retriedAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "setAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isMinter",
        type: "bool",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620022523803806200225283398101604081905262000034916200023a565b8181620000413362000077565b815162000056906001906020850190620000c7565b5080516200006c906002906020840190620000c7565b5050505050620002e1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000d590620002a4565b90600052602060002090601f016020900481019282620000f9576000855562000144565b82601f106200011457805160ff191683800117855562000144565b8280016001018555821562000144579182015b828111156200014457825182559160200191906001019062000127565b506200015292915062000156565b5090565b5b8082111562000152576000815560010162000157565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200019557600080fd5b81516001600160401b0380821115620001b257620001b26200016d565b604051601f8301601f19908116603f01168101908282118183101715620001dd57620001dd6200016d565b81604052838152602092508683858801011115620001fa57600080fd5b600091505b838210156200021e5785820183015181830184015290820190620001ff565b83821115620002305760008385830101525b9695505050505050565b600080604083850312156200024e57600080fd5b82516001600160401b03808211156200026657600080fd5b620002748683870162000183565b935060208501519150808211156200028b57600080fd5b506200029a8582860162000183565b9150509250929050565b600181811c90821680620002b957607f821691505b60208210811415620002db57634e487b7160e01b600052602260045260246000fd5b50919050565b611f6180620002f16000396000f3fe608060405234801561001057600080fd5b50600436106101ae5760003560e01c8063715018a6116100ee5780639e41397411610097578063c87b56dd11610071578063c87b56dd14610377578063cf456ae71461038a578063e985e9c5146103c3578063f2fde38b146103ff57600080fd5b80639e4139741461033e578063a22cb46514610351578063b88d4fde1461036457600080fd5b80638a6d29c3116100c85780638a6d29c3146103125780638da5cb5b1461032557806395d89b411461033657600080fd5b8063715018a6146102ee5780637e6cee68146102f657806386e8fa051461030957600080fd5b80633dd08c381161015b57806355f804b31161013557806355f804b3146102ad5780636352211e146102c05780636c0360eb146102d357806370a08231146102db57600080fd5b80633dd08c381461026457806342842e0e1461028757806348bc17bf1461029a57600080fd5b8063095ea7b31161018c578063095ea7b31461021b57806323b872dd146102305780632f00d3d91461024357600080fd5b806301ffc9a7146101b357806306fdde03146101db578063081812fc146101f0575b600080fd5b6101c66101c136600461173d565b610412565b60405190151581526020015b60405180910390f35b6101e3610464565b6040516101d291906117a7565b6102036101fe3660046117ba565b6104f6565b6040516001600160a01b0390911681526020016101d2565b61022e6102293660046117ea565b610590565b005b61022e61023e366004611814565b6106a6565b6102566102513660046117ba565b610721565b6040519081526020016101d2565b6101c6610272366004611850565b600e6020526000908152604090205460ff1681565b61022e610295366004611814565b610790565b61022e6102a836600461192a565b6107ab565b61022e6102bb366004611993565b610892565b6102036102ce3660046117ba565b61093c565b6101e36109b3565b6102566102e9366004611850565b610a41565b61022e610ac8565b61022e610304366004611b39565b610b2e565b610256600f5481565b61022e610320366004611c0b565b610c2c565b6000546001600160a01b0316610203565b6101e3610cdd565b61025661034c3660046117ba565b610cec565b61022e61035f366004611c2d565b610d43565b61022e610372366004611c69565b610d52565b6101e36103853660046117ba565b610dd4565b61022e610398366004611c2d565b6001600160a01b03919091166000908152600e60205260409020805460ff1916911515919091179055565b6101c66103d1366004611ce5565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b61022e61040d366004611850565b610e77565b60006001600160e01b031982166380ac58cd60e01b148061044357506001600160e01b03198216635b5e139f60e01b145b8061045e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606001805461047390611d18565b80601f016020809104026020016040519081016040528092919081815260200182805461049f90611d18565b80156104ec5780601f106104c1576101008083540402835291602001916104ec565b820191906000526020600020905b8154815290600101906020018083116104cf57829003601f168201915b5050505050905090565b6000818152600360205260408120546001600160a01b03166105745760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600560205260409020546001600160a01b031690565b600061059b8261093c565b9050806001600160a01b0316836001600160a01b031614156106095760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161056b565b336001600160a01b0382161480610625575061062581336103d1565b6106975760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161056b565b6106a18383610f42565b505050565b6106b03382610fb0565b6107165760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6044820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606482015260840161056b565b6106a18383836110a7565b6000818152600d602052604081205461073b904390611247565b6000838152600c60205260409020541115610783576000828152600d602052604090205461045e9061076e904390611247565b6000848152600c602052604090205490611247565b506000919050565b919050565b6106a183838360405180602001604052806000815250610d52565b336000908152600e602052604090205460ff166107f95760405162461bcd60e51b815260206004820152600c60248201526b37b7363c9036b4b73a32b91760a11b604482015260640161056b565b610803858461125a565b6000838152600a6020908152604090912085516108229287019061168e565b506000838152600b60209081526040808320859055600d8252808320439055600c82529182902083905581516001600160a01b03881681529081018590527f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885910160405180910390a15050505050565b6000546001600160a01b031633146108ec5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056b565b80516108ff90600990602084019061168e565b507f3c42d3d44528567a4b8240087caeb9cbe1566558404b077783b47c2e62d3d2b13382604051610931929190611d53565b60405180910390a150565b6000818152600360205260408120546001600160a01b03168061045e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161056b565b600980546109c090611d18565b80601f01602080910402602001604051908101604052809291908181526020018280546109ec90611d18565b8015610a395780601f10610a0e57610100808354040283529160200191610a39565b820191906000526020600020905b815481529060010190602001808311610a1c57829003601f168201915b505050505081565b60006001600160a01b038216610aac5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161056b565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b03163314610b225760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056b565b610b2c600061139c565b565b336000908152600e602052604090205460ff16610b7c5760405162461bcd60e51b815260206004820152600c60248201526b37b7363c9036b4b73a32b91760a11b604482015260640161056b565b60005b8551811015610c2457610c12868281518110610b9d57610b9d611d75565b6020026020010151868381518110610bb757610bb7611d75565b6020026020010151868481518110610bd157610bd1611d75565b6020026020010151868581518110610beb57610beb611d75565b6020026020010151868681518110610c0557610c05611d75565b60200260200101516107ab565b80610c1c81611da1565b915050610b7f565b505050505050565b6000546001600160a01b03163314610c865760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056b565b6000828152600c602090815260409182902083905581513381529081018490529081018290527f0341b6b57594dd358ac2c416d028b588b60f8b6523aa4a69b6e2f658063bfe849060600160405180910390a15050565b60606002805461047390611d18565b6000818152600c6020908152604080832054600d909252822054610d109043611dbc565b1115610d30576000828152600b602052604090205461045e9060056113ec565b506000908152600b602052604090205490565b610d4e3383836113f8565b5050565b610d5c3383610fb0565b610dc25760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6044820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606482015260840161056b565b610dce848484846114c7565b50505050565b6000818152600360205260409020546060906001600160a01b0316610e3b5760405162461bcd60e51b815260206004820152601f60248201527f55524920717565727920666f72206e6f6e6578697374656e7420746f6b656e00604482015260640161056b565b6009600a6000848152602001908152602001600020604051602001610e61929190611e6d565b6040516020818303038152906040529050919050565b6000546001600160a01b03163314610ed15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056b565b6001600160a01b038116610f365760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161056b565b610f3f8161139c565b50565b600081815260056020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610f778261093c565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600360205260408120546001600160a01b03166110295760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161056b565b60006110348361093c565b9050806001600160a01b0316846001600160a01b0316148061106f5750836001600160a01b0316611064846104f6565b6001600160a01b0316145b8061109f57506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166110ba8261093c565b6001600160a01b0316146111225760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b606482015260840161056b565b6001600160a01b0382166111845760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161056b565b61118f600082610f42565b6001600160a01b03831660009081526004602052604081208054600192906111b8908490611dbc565b90915550506001600160a01b03821660009081526004602052604081208054600192906111e6908490611e98565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60006112538284611dbc565b9392505050565b6001600160a01b0382166112b05760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161056b565b6000818152600360205260409020546001600160a01b0316156113155760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161056b565b6001600160a01b038216600090815260046020526040812080546001929061133e908490611e98565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006112538284611eb0565b816001600160a01b0316836001600160a01b0316141561145a5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161056b565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6114d28484846110a7565b6114de84848484611545565b610dce5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161056b565b60006001600160a01b0384163b1561168357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611589903390899088908890600401611ed2565b6020604051808303816000875af19250505080156115c4575060408051601f3d908101601f191682019092526115c191810190611f0e565b60015b611669573d8080156115f2576040519150601f19603f3d011682016040523d82523d6000602084013e6115f7565b606091505b5080516116615760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161056b565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061109f565b506001949350505050565b82805461169a90611d18565b90600052602060002090601f0160209004810192826116bc5760008555611702565b82601f106116d557805160ff1916838001178555611702565b82800160010185558215611702579182015b828111156117025782518255916020019190600101906116e7565b5061170e929150611712565b5090565b5b8082111561170e5760008155600101611713565b6001600160e01b031981168114610f3f57600080fd5b60006020828403121561174f57600080fd5b813561125381611727565b6000815180845260005b8181101561178057602081850181015186830182015201611764565b81811115611792576000602083870101525b50601f01601f19169290920160200192915050565b602081526000611253602083018461175a565b6000602082840312156117cc57600080fd5b5035919050565b80356001600160a01b038116811461078b57600080fd5b600080604083850312156117fd57600080fd5b611806836117d3565b946020939093013593505050565b60008060006060848603121561182957600080fd5b611832846117d3565b9250611840602085016117d3565b9150604084013590509250925092565b60006020828403121561186257600080fd5b611253826117d3565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156118aa576118aa61186b565b604052919050565b600067ffffffffffffffff8311156118cc576118cc61186b565b6118df601f8401601f1916602001611881565b90508281528383830111156118f357600080fd5b828260208301376000602084830101529392505050565b600082601f83011261191b57600080fd5b611253838335602085016118b2565b600080600080600060a0868803121561194257600080fd5b61194b866117d3565b9450602086013567ffffffffffffffff81111561196757600080fd5b6119738882890161190a565b959895975050505060408401359360608101359360809091013592509050565b6000602082840312156119a557600080fd5b813567ffffffffffffffff8111156119bc57600080fd5b61109f8482850161190a565b600067ffffffffffffffff8211156119e2576119e261186b565b5060051b60200190565b600082601f8301126119fd57600080fd5b81356020611a12611a0d836119c8565b611881565b82815260059290921b84018101918181019086841115611a3157600080fd5b8286015b84811015611a5357611a46816117d3565b8352918301918301611a35565b509695505050505050565b600082601f830112611a6f57600080fd5b81356020611a7f611a0d836119c8565b82815260059290921b84018101918181019086841115611a9e57600080fd5b8286015b84811015611a5357803567ffffffffffffffff811115611ac25760008081fd5b611ad08986838b010161190a565b845250918301918301611aa2565b600082601f830112611aef57600080fd5b81356020611aff611a0d836119c8565b82815260059290921b84018101918181019086841115611b1e57600080fd5b8286015b84811015611a535780358352918301918301611b22565b600080600080600060a08688031215611b5157600080fd5b853567ffffffffffffffff80821115611b6957600080fd5b611b7589838a016119ec565b96506020880135915080821115611b8b57600080fd5b611b9789838a01611a5e565b95506040880135915080821115611bad57600080fd5b611bb989838a01611ade565b94506060880135915080821115611bcf57600080fd5b611bdb89838a01611ade565b93506080880135915080821115611bf157600080fd5b50611bfe88828901611ade565b9150509295509295909350565b60008060408385031215611c1e57600080fd5b50508035926020909101359150565b60008060408385031215611c4057600080fd5b611c49836117d3565b915060208301358015158114611c5e57600080fd5b809150509250929050565b60008060008060808587031215611c7f57600080fd5b611c88856117d3565b9350611c96602086016117d3565b925060408501359150606085013567ffffffffffffffff811115611cb957600080fd5b8501601f81018713611cca57600080fd5b611cd9878235602084016118b2565b91505092959194509250565b60008060408385031215611cf857600080fd5b611d01836117d3565b9150611d0f602084016117d3565b90509250929050565b600181811c90821680611d2c57607f821691505b60208210811415611d4d57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260406020820152600061109f604083018461175a565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415611db557611db5611d8b565b5060010190565b600082821015611dce57611dce611d8b565b500390565b8054600090600181811c9080831680611ded57607f831692505b6020808410821415611e0f57634e487b7160e01b600052602260045260246000fd5b818015611e235760018114611e3457611e61565b60ff19861689528489019650611e61565b60008881526020902060005b86811015611e595781548b820152908501908301611e40565b505084890196505b50505050505092915050565b6000611e82611e7c8386611dd3565b84611dd3565b64173539b7b760d91b8152600501949350505050565b60008219821115611eab57611eab611d8b565b500190565b600082611ecd57634e487b7160e01b600052601260045260246000fd5b500490565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611f04608083018461175a565b9695505050505050565b600060208284031215611f2057600080fd5b81516112538161172756fea2646970667358221220d1670148ac5940a0359e8f8d6259c3df081e66b1811a64fc3dc7f0c71a0a70c464736f6c634300080b0033";

export class Horse__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Horse> {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<Horse>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  attach(address: string): Horse {
    return super.attach(address) as Horse;
  }
  connect(signer: Signer): Horse__factory {
    return super.connect(signer) as Horse__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HorseInterface {
    return new utils.Interface(_abi) as HorseInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Horse {
    return new Contract(address, _abi, signerOrProvider) as Horse;
  }
}