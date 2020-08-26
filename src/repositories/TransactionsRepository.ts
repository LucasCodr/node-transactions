/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const { income, outcome } = this.transactions.reduce(
      (ac: Balance, cur: Transaction) => {
        if (cur.type === 'income') {
          ac.income += cur.value;
        } else {
          ac.outcome += cur.value;
        }

        return ac;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction: Transaction = { id: uuid(), title, type, value };

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
