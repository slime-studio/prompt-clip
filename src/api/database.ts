import { Dexie, Table } from 'dexie'

export interface IPrompt extends Omit<Prompt, 'id'> {
  id?: number
}

export interface IPromptList
  extends Omit<PromptList, 'id'> {
  id?: number
}

class PromptClipDB extends Dexie {
  prompts!: Table<IPrompt>
  promptLists!: Table<IPromptList>

  constructor() {
    // Origin-scoped persistence key, not a product name. Do not rename.
    super('app')
    console.info('Initializing `prompts` table...')
    this.version(1).stores({
      prompts: '++id, index, text',
    })
    this.version(1).stores({
      promptLists: '++id, index, name, itemIds',
    })
  }
  static instance(): PromptClipDB {
    return new PromptClipDB()
  }
}

const database = new PromptClipDB()
export default database
