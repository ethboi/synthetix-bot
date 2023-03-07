import { Run } from './bot'

async function Init(): Promise<void> {
  try {
    await Run()
  } catch (error) {
    console.log(error)
  }
}

Init()
