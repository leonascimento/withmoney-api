const bcrypt = require('bcrypt');
const config = require('../../config/envs');

const timestamp = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user = {
  password: bcrypt.hashSync('P@ssw0rd', bcrypt.genSaltSync(config.BCRYPT_SALT)),
  enabled: true,
  ...timestamp,
};

const userOne = {
  name: 'David Costa',
  email: 'davidcostadev@gmail.com',
  ...user,
};

const userTwo = {
  name: 'Halan Pinheiro',
  email: 'Halan@gmail.com',
  ...user,
};

const salarioCategory = {
  name: 'Salário',
  type: 'in',
  ...timestamp,
};
const lancheCategory = {
  name: 'Lanche',
  type: 'out',
  ...timestamp,
};
const contasCategory = {
  name: 'Contas',
  type: 'out',
  ...timestamp,
};

const bancointerAccount = {
  name: 'Banco Inter',
  type: 'checking_account',
  initalValue: 505.18,
  ...timestamp,
};

const carteiraAccount = {
  name: 'Carteira',
  type: 'wallet',
  initalValue: 650,
  ...timestamp,
};

const interTransactionOne = {
  name: 'Salario do Mês',
  value: 937,
  type: 'in',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};
const interTransactionTwo = {
  name: 'Lanche na Sonia',
  value: 30.90,
  type: 'out',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};

const walletTransaction = {
  name: 'Coxinha',
  value: 3.13,
  type: 'out',
  isPaid: false,
  transactionDate: new Date(),
  ...timestamp,
};

const halanWalletTransaction = {
  name: 'Cafe',
  value: 23,
  type: 'out',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};

const transferToWalletOutTransaction = {
  name: 'transfer',
  value: 100,
  type: 'out',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};

const transferToWalletInTransaction = {
  name: 'transfer',
  value: 100,
  type: 'in',
  isPaid: true,
  transactionDate: new Date(),
  ...timestamp,
};

module.exports = {
  up: async (queryInterface) => {
    const userOneId = await queryInterface.bulkInsert('Users', [userOne]);
    const userTwoId = await queryInterface.bulkInsert('Users', [userTwo]);

    lancheCategory.UserId = userOneId;
    salarioCategory.UserId = userOneId;
    contasCategory.UserId = userOneId;

    const lancheCategoryId = await queryInterface.bulkInsert('Categories', [lancheCategory]);
    const salarioCategoryId = await queryInterface.bulkInsert('Categories', [salarioCategory]);
    await queryInterface.bulkInsert('Categories', [contasCategory]);

    lancheCategory.UserId = userTwoId;

    const lancheCategoryTwoId = await queryInterface.bulkInsert('Categories', [lancheCategory]);

    bancointerAccount.UserId = userOneId;
    carteiraAccount.UserId = userOneId;

    const accountIdInter = await queryInterface.bulkInsert('Accounts', [bancointerAccount]);
    const accountIdWallet = await queryInterface.bulkInsert('Accounts', [carteiraAccount]);

    bancointerAccount.UserId = userTwoId;
    carteiraAccount.UserId = userTwoId;

    const accountIdTwoWallet = await queryInterface.bulkInsert('Accounts', [carteiraAccount]);

    interTransactionOne.UserId = userOneId;
    interTransactionTwo.UserId = userOneId;
    walletTransaction.UserId = userOneId;
    halanWalletTransaction.UserId = userTwoId;
    halanWalletTransaction.CategoryId = lancheCategoryTwoId;
    halanWalletTransaction.AccountId = accountIdTwoWallet;

    interTransactionOne.CategoryId = salarioCategoryId;
    interTransactionTwo.CategoryId = lancheCategoryId;
    walletTransaction.CategoryId = lancheCategoryId;
    interTransactionOne.AccountId = accountIdInter;
    interTransactionTwo.AccountId = accountIdInter;
    walletTransaction.AccountId = accountIdWallet;

    const journalId = await queryInterface.bulkInsert('Journals', [{
      UserId: userOneId,
      type: 'transfers',
      ...timestamp,
    }]);

    transferToWalletOutTransaction.UserId = userOneId;
    transferToWalletOutTransaction.AccountId = accountIdInter;
    transferToWalletOutTransaction.JournalId = journalId;

    transferToWalletInTransaction.UserId = userOneId;
    transferToWalletInTransaction.AccountId = accountIdWallet;
    transferToWalletInTransaction.JournalId = journalId;

    await queryInterface.bulkInsert('Transactions', [
      interTransactionOne,
      interTransactionTwo,
      walletTransaction,
      halanWalletTransaction,
      transferToWalletOutTransaction,
      transferToWalletInTransaction,
    ]);
  },
  down: (queryInterface) => {
    queryInterface.bulkDelete('Users');
  }, /* queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => (
      queryInterface.bulkDelete('Users', null, { truncate: true })
        .then(() => (
          queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        ))
    )), */
};
