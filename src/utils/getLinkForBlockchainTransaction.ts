export const getLinkForBlockchainTransaction = ({
  transactionId,
  network,
}: GetLinkForBlockchainTransactionArgs): string => {
  switch (network.toLocaleLowerCase()) {
    case 'eth':
      return `https://etherscan.io/tx/${transactionId}`;
    case 'polygon':
      return `https://polygonscan.com/tx/${transactionId}`;
    case 'bsc':
      return `https://bscscan.com/tx/${transactionId}`;
    case 'arbitrum':
      return `https://arbiscan.io/tx/${transactionId}`;
    case 'avalanche':
      return `https://cchain.explorer.avax.network/tx/${transactionId}`;
    case 'tron':
      return `https://tronscan.org/#/transaction/${transactionId}`;
    case 'sol':
      return `https://explorer.solana.com/tx/${transactionId}`;
    default:
      return '#';
  }
};

export type GetLinkForBlockchainTransactionArgs = {
  transactionId: string;
  network: string;
};
