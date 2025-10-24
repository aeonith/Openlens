export const wikipediaStyleArticles = [
  {
    title: 'Artificial Intelligence: History and Development',
    content: `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think and learn. The field was founded as an academic discipline in 1956, and has experienced several waves of optimism, followed by disappointment and loss of funding (known as an "AI winter"), followed by new approaches, success and renewed funding.

The development of AI research has been marked by several milestones:

**Early Foundations (1940s-1950s)**
Alan Turing proposed the Turing Test in 1950 as a measure of machine intelligence. The term "Artificial Intelligence" was coined by John McCarthy in 1956 at the Dartmouth Conference.

**Golden Years (1956-1974)**
Early AI programs demonstrated remarkable capabilities in playing games, solving algebra problems, and proving logical theorems. However, these systems operated in simplified "microworlds."

**First AI Winter (1974-1980)**
Limitations of early AI systems became apparent. The computational power available was insufficient, and many problems proved more difficult than initially anticipated.

**Boom Period (1980-1987)**
Expert systems, which encode human knowledge in specific domains, became commercially successful. Japan's Fifth Generation Computer Systems project aimed to create intelligent computers.

**Second AI Winter (1987-1993)**
The limitations of expert systems and the collapse of the LISP machine market led to reduced funding and interest.

**Modern Era (1993-Present)**
The field has experienced remarkable growth driven by increased computational power, large datasets, and new algorithmic approaches like deep learning. AI systems now surpass human performance in many specific tasks.`,
    claims: [
      {
        text: 'AI was founded as an academic discipline in 1956',
        evidence: 'https://en.wikipedia.org/wiki/Dartmouth_workshop',
        status: 'verified'
      },
      {
        text: 'Alan Turing proposed the Turing Test in 1950',
        evidence: 'https://www.csee.umbc.edu/courses/471/papers/turing.pdf',
        status: 'verified'
      }
    ],
    category: 'Technology'
  },
  {
    title: 'Climate Change: Scientific Consensus and Evidence',
    content: `Climate change refers to long-term shifts in temperatures and weather patterns, primarily caused by human activities since the 1800s, particularly the burning of fossil fuels.

**Scientific Evidence**
Multiple independent lines of evidence confirm that Earth's climate is warming:
- Global average temperature has increased by approximately 1.1°C since pre-industrial times
- Arctic sea ice is declining at a rate of 13% per decade
- Sea levels have risen by about 20cm since 1900
- Ocean heat content has increased significantly

**Causes**
The primary driver is the greenhouse effect, where gases like CO2 trap heat in the atmosphere. Human activities, particularly:
- Burning fossil fuels (coal, oil, natural gas)
- Deforestation
- Industrial processes
- Agriculture

**Impacts**
Observable effects include:
- More frequent and severe weather events
- Melting glaciers and ice sheets
- Ocean acidification
- Shifts in wildlife populations and habitats
- Rising sea levels threatening coastal communities

**Scientific Consensus**
Over 99% of peer-reviewed scientific papers agree that climate change is real and human-caused. Major scientific organizations worldwide, including NASA, NOAA, and the IPCC, support this consensus.`,
    claims: [
      {
        text: 'Over 99% of peer-reviewed papers agree climate change is human-caused',
        evidence: 'https://iopscience.iop.org/article/10.1088/1748-9326/ac2966',
        status: 'verified'
      },
      {
        text: 'Global temperature has increased 1.1°C since pre-industrial times',
        evidence: 'https://www.ipcc.ch/report/ar6/wg1/',
        status: 'verified'
      }
    ],
    category: 'Science'
  },
  {
    title: 'Blockchain Technology and Cryptocurrencies',
    content: `Blockchain is a distributed ledger technology that maintains a continuously growing list of records (blocks) secured through cryptography. Each block contains a cryptographic hash of the previous block, transaction data, and a timestamp.

**Key Characteristics**
- Decentralization: No single point of control
- Transparency: All transactions are visible to network participants
- Immutability: Once recorded, data cannot be altered retroactively
- Security: Cryptographic techniques protect against tampering

**History**
The concept was first proposed in 1991, but gained prominence with Bitcoin's creation in 2008 by Satoshi Nakamoto (pseudonym). Bitcoin demonstrated blockchain's potential as the foundation for cryptocurrency.

**Applications Beyond Cryptocurrency**
- Supply chain management
- Healthcare records
- Voting systems
- Smart contracts (self-executing contracts with terms directly written into code)
- Digital identity verification

**Cryptocurrencies**
Digital or virtual currencies that use cryptography for security:
- Bitcoin (BTC): First and largest by market cap
- Ethereum (ETH): Enables smart contracts and decentralized applications
- Thousands of alternative cryptocurrencies exist

**Challenges**
- Energy consumption (especially Proof of Work systems)
- Scalability limitations
- Regulatory uncertainty
- Volatility in cryptocurrency markets`,
    claims: [
      {
        text: 'Bitcoin was created in 2008 by Satoshi Nakamoto',
        evidence: 'https://bitcoin.org/bitcoin.pdf',
        status: 'verified'
      },
      {
        text: 'Blockchain concept was first proposed in 1991',
        evidence: 'https://link.springer.com/article/10.1007/BF00196791',
        status: 'verified'
      }
    ],
    category: 'Technology'
  },
  {
    title: 'Space Exploration: Mars Missions and Future Colonization',
    content: `Mars has been a target of human fascination and exploration efforts for decades. As our closest planetary neighbor capable of sustaining human life (with significant technological support), Mars represents humanity's next frontier.

**Historical Mars Missions**
- Mariner 4 (1965): First successful flyby, revealing a barren, cratered surface
- Viking 1 & 2 (1976): First successful landings, searched for life
- Mars Pathfinder (1997): Deployed Sojourner, the first Mars rover
- Spirit and Opportunity (2004): Extended missions discovering past water evidence
- Curiosity (2012): Confirmed Mars once had conditions suitable for microbial life
- Perseverance (2021): Currently searching for signs of ancient life, collecting samples

**Current Understanding**
Mars today is cold and dry, with:
- Thin atmosphere (95% CO2)
- Average temperature: -63°C
- Evidence of past liquid water
- Polar ice caps containing water and CO2
- Possibility of subsurface liquid water

**Colonization Challenges**
- Radiation exposure (no magnetic field)
- Thin atmosphere requiring pressurized habitats
- Extreme cold
- Dust storms
- Distance from Earth (communication delay: 3-22 minutes)
- Resource constraints

**Future Plans**
- NASA's Artemis program aims to establish lunar presence as stepping stone
- SpaceX's Starship designed for Mars transport
- International cooperation for permanent Mars base
- Timeline estimates range from 2030s to 2050s`,
    claims: [
      {
        text: 'Curiosity rover confirmed Mars once had conditions suitable for microbial life',
        evidence: 'https://www.nasa.gov/press-release/nasa-rover-finds-active-ancient-organic-chemistry-on-mars',
        status: 'verified'
      },
      {
        text: 'Human Mars mission planned for 2030s-2050s',
        evidence: 'https://www.nasa.gov/humans-on-mars/',
        status: 'theory'
      }
    ],
    category: 'Space'
  },
  {
    title: 'Quantum Computing: Principles and Applications',
    content: `Quantum computing harnesses quantum mechanical phenomena to process information in fundamentally different ways than classical computers. Rather than using bits (0 or 1), quantum computers use quantum bits or "qubits" that can exist in superposition.

**Key Principles**
- **Superposition**: Qubits can represent 0, 1, or both simultaneously
- **Entanglement**: Qubits can be correlated in ways impossible classically
- **Interference**: Quantum states can amplify correct answers and cancel wrong ones

**Advantages Over Classical Computing**
For specific problems, quantum computers can offer exponential speedups:
- Factoring large numbers (Shor's algorithm)
- Searching databases (Grover's algorithm)
- Simulating quantum systems
- Optimization problems
- Machine learning

**Current State**
- IBM, Google, and others have demonstrated "quantum supremacy" for specific tasks
- Current systems have 50-1000+ qubits
- Still prone to errors requiring quantum error correction
- Most systems require near absolute zero temperatures

**Potential Applications**
- Drug discovery and molecular simulation
- Cryptography (breaking current encryption, creating quantum-safe methods)
- Financial modeling
- Climate modeling
- Artificial intelligence advancement

**Challenges**
- Decoherence (qubits losing quantum state)
- Error rates
- Scaling to millions of qubits needed for practical applications
- Cost and complexity`,
    claims: [
      {
        text: 'Google demonstrated quantum supremacy in 2019',
        evidence: 'https://www.nature.com/articles/s41586-019-1666-5',
        status: 'verified'
      },
      {
        text: 'Quantum computers could break current encryption methods',
        evidence: 'https://arxiv.org/abs/quant-ph/9508027',
        status: 'theory'
      }
    ],
    category: 'Technology'
  }
]
