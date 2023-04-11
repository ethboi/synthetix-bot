export function HelpDiscord(): string {
  const post: string[] = []
  post.push('```\n')
  post.push('===============================================\n')
  post.push('COMMAND            | DESCRIPTION\n')
  post.push('===============================================\n')
  post.push('/markets           | Market overview, popular markets\n')
  post.push('/funding <market>  | Fetch funding rates for a market\n')
  post.push('/arbs              | Arbs overview, popular markets\n')
  post.push('/arb <market>      | Fetch arb rates for a market\n')
  post.push('```\n')
  return post.join('')
}
