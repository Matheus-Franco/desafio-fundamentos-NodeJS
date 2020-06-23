import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionsIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const totalIncome: number = transactionsIncome.reduce(
      (total: number, { value }) => {
        return total + value;
      },
      0,
    );

    const transactionsOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalOutcome: number = transactionsOutcome.reduce(
      (total: number, { value }) => {
        return total + value;
      },
      0,
    );

    const totalBalance: number = totalIncome - totalOutcome;

    const { income, outcome, total }: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
