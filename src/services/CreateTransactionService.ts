import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(type === 'outcome' || type === 'income')) {
      throw Error('Invalid type of transaction');
    }
    if (!(value > 0)) {
      throw Error('Invalid value. Plese enter a positive number');
    }
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('Not enough funds. Balance insufficient');
    } else {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }
  }
}

export default CreateTransactionService;
