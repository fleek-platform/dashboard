import { useState } from 'react';
import type { Address } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

import { abi } from './contracts/EnsPublicRegistryAbi';

type Arguments = {
  resolver: Address;
  node: Address;
  hash: Address;
};

export type EnsContext = {
  prepare: ReturnType<typeof usePrepareContractWrite>;
  write: ReturnType<typeof useContractWrite>;
  transaction: ReturnType<typeof useWaitForTransaction>;
  setArgs: (args: Arguments) => void;
};

const [Provider, useContext] = createContext<EnsContext>({
  name: 'EnsContext',
  hookName: 'useEnsContext',
  providerName: 'EnsProvider',
});

export const EnsProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [args, setArgs] = useState<Arguments>({
    resolver: '0x0' as Address,
    node: '0x0' as Address,
    hash: '0x0' as Address,
  });

  const prepare = usePrepareContractWrite({
    address: args.resolver,
    abi,
    functionName: 'setContenthash',
    args: [args.node, args.hash],
  });

  const write = useContractWrite(prepare.config);

  const transaction = useWaitForTransaction({
    hash: write.data?.hash,
  });

  const value = {
    prepare,
    write,
    transaction,
    setArgs,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useEnsContext = useContext;
