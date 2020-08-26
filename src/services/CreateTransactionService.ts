import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const negativeBalance = balance.total - value;

    if (type === 'outcome' && negativeBalance < 0)
      throw Error("You can't create an outcome that exeed your total balance.");

    const transaction: Transaction = { id: uuid(), title, type, value };

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
