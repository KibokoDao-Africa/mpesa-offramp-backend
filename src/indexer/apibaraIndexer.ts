import { createIndexerClient, Stream, StreamData, Filter } from '@apibara/protocol';
import db from '../models';
import offrampService from '../services/offrampService';
import onrampService from '../services/onrampService';

// Function to start the indexer
const startIndexer = async () => {
  const client = createIndexerClient({
    endpoint: process.env.APIBARA_ENDPOINT!,
    token: process.env.APIBARA_TOKEN!,
  });

  // Define filters for the events you want to listen to
  const filters: Filter[] = [
    {
      address: process.env.SMART_CONTRACT_ADDRESS!,
      event: 'OfframpTransaction', // Event emitted by the smart contract for Offramp
      fields: [
        { name: 'transactionId', type: 'bytes32' },
        // Include other relevant fields based on your smart contract
      ],
    },
    {
      address: process.env.SMART_CONTRACT_ADDRESS!,
      event: 'OnrampTransaction', // Event emitted by the smart contract for Onramp
      fields: [
        { name: 'transactionId', type: 'bytes32' },
        // Include other relevant fields based on your smart contract
      ],
    },
  ];

  const stream = new Stream(client, { filters });

  // Handle incoming data from the blockchain
  stream
    .data(async (data: StreamData) => {
      for (const block of data.blocks) {
        for (const tx of block.transactions) {
          for (const event of tx.events) {
            if (event.eventName === 'OfframpTransaction') {
              // Handle Offramp transaction
              const transactionId = event.data.transactionId;
              const txHash = tx.hash;
              const blockNumber = block.number;

              // Call the service to handle the on-chain transaction
              await offrampService.handleOnchainTransaction({
                transactionId,
                txHash,
                blockNumber,
              });
            } else if (event.eventName === 'OnrampTransaction') {
              // Handle Onramp transaction
              const transactionId = event.data.transactionId;
              const txHash = tx.hash;
              const blockNumber = block.number;

              // Call the service to handle the on-chain transaction
              await onrampService.handleOnchainTransaction({
                transactionId,
                txHash,
                blockNumber,
              });
            }
          }
        }
      }
    })
    .start()
    .catch((error: any) => {
      console.error('Error starting indexer:', error);
    });
};

// Start the indexer
startIndexer().catch((err) => {
  console.error('Error initializing indexer:', err);
});
