
export const config = {
  streamUrl: process.env.APIBARA_ENDPOINT!,
  network: 'starknet',
  startingBlock: 0,
  finality: 'accepted',
  filter: [
    {
      address: process.env.SMART_CONTRACT_ADDRESS!,
      eventName: 'OfframpTransaction',
      keys: [{ name: 'transactionId', type: 'bytes32' }],
    },
    {
      address: process.env.SMART_CONTRACT_ADDRESS!,
      eventName: 'OnrampTransaction',
      keys: [{ name: 'transactionId', type: 'bytes32' }],
    },
  ],
  sinkType: 'console',
  sinkOptions: {},
};

export default async function transform(block: { transactions: any[]; number: any; }) {
  const events: { transactionId: any; txHash: any; blockNumber: any; }[] = [];

  block.transactions.forEach((tx: { events: any[]; hash: any; }) => {
    tx.events.forEach((event: { eventName: string; data: { transactionId: any; }; }) => {
      if (event.eventName === 'OfframpTransaction') {
        // Handle OfframpTransaction
        events.push({
          transactionId: event.data.transactionId,
          txHash: tx.hash,
          blockNumber: block.number,
        });
      } else if (event.eventName === 'OnrampTransaction') {
        // Handle OnrampTransaction
        events.push({
          transactionId: event.data.transactionId,
          txHash: tx.hash,
          blockNumber: block.number,
        });
      }
    });
  });

  return events;
}
