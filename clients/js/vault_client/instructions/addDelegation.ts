/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const ADD_DELEGATION_DISCRIMINATOR = 21;

export function getAddDelegationDiscriminatorBytes() {
  return getU8Encoder().encode(ADD_DELEGATION_DISCRIMINATOR);
}

export type AddDelegationInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountOperator extends string | IAccountMeta<string> = string,
  TAccountVaultOperatorDelegation extends
    | string
    | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountConfig extends string
        ? ReadonlyAccount<TAccountConfig>
        : TAccountConfig,
      TAccountVault extends string
        ? WritableAccount<TAccountVault>
        : TAccountVault,
      TAccountOperator extends string
        ? ReadonlyAccount<TAccountOperator>
        : TAccountOperator,
      TAccountVaultOperatorDelegation extends string
        ? WritableAccount<TAccountVaultOperatorDelegation>
        : TAccountVaultOperatorDelegation,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type AddDelegationInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type AddDelegationInstructionDataArgs = { amount: number | bigint };

export function getAddDelegationInstructionDataEncoder(): Encoder<AddDelegationInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: ADD_DELEGATION_DISCRIMINATOR })
  );
}

export function getAddDelegationInstructionDataDecoder(): Decoder<AddDelegationInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
  ]);
}

export function getAddDelegationInstructionDataCodec(): Codec<
  AddDelegationInstructionDataArgs,
  AddDelegationInstructionData
> {
  return combineCodec(
    getAddDelegationInstructionDataEncoder(),
    getAddDelegationInstructionDataDecoder()
  );
}

export type AddDelegationInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountOperator extends string = string,
  TAccountVaultOperatorDelegation extends string = string,
  TAccountAdmin extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  operator: Address<TAccountOperator>;
  vaultOperatorDelegation: Address<TAccountVaultOperatorDelegation>;
  admin: TransactionSigner<TAccountAdmin>;
  systemProgram?: Address<TAccountSystemProgram>;
  amount: AddDelegationInstructionDataArgs['amount'];
};

export function getAddDelegationInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountOperator extends string,
  TAccountVaultOperatorDelegation extends string,
  TAccountAdmin extends string,
  TAccountSystemProgram extends string,
>(
  input: AddDelegationInput<
    TAccountConfig,
    TAccountVault,
    TAccountOperator,
    TAccountVaultOperatorDelegation,
    TAccountAdmin,
    TAccountSystemProgram
  >
): AddDelegationInstruction<
  typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig,
  TAccountVault,
  TAccountOperator,
  TAccountVaultOperatorDelegation,
  TAccountAdmin,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    operator: { value: input.operator ?? null, isWritable: false },
    vaultOperatorDelegation: {
      value: input.vaultOperatorDelegation ?? null,
      isWritable: true,
    },
    admin: { value: input.admin ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.operator),
      getAccountMeta(accounts.vaultOperatorDelegation),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getAddDelegationInstructionDataEncoder().encode(
      args as AddDelegationInstructionDataArgs
    ),
  } as AddDelegationInstruction<
    typeof JITO_VAULT_PROGRAM_ADDRESS,
    TAccountConfig,
    TAccountVault,
    TAccountOperator,
    TAccountVaultOperatorDelegation,
    TAccountAdmin,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedAddDelegationInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    operator: TAccountMetas[2];
    vaultOperatorDelegation: TAccountMetas[3];
    admin: TAccountMetas[4];
    systemProgram: TAccountMetas[5];
  };
  data: AddDelegationInstructionData;
};

export function parseAddDelegationInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddDelegationInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      config: getNextAccount(),
      vault: getNextAccount(),
      operator: getNextAccount(),
      vaultOperatorDelegation: getNextAccount(),
      admin: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getAddDelegationInstructionDataDecoder().decode(instruction.data),
  };
}
