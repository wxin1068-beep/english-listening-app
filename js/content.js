const LESSONS = [
  // ========== BEGINNER ==========
  {
    id: 1,
    title: 'A Day at the Park',
    level: 'beginner',
    topic: 'daily life',
    description: 'Learn about a relaxing day at the park with simple vocabulary.',
    text: 'Today I went to the park. The weather was nice and warm. I saw many children playing on the grass. Some dogs were running around. There was a small pond with ducks swimming in it. I sat on a bench and read a book. It was a very relaxing afternoon.',
    sentences: [
      'Today I went to the park.',
      'The weather was nice and warm.',
      'I saw many children playing on the grass.',
      'Some dogs were running around.',
      'There was a small pond with ducks swimming in it.',
      'I sat on a bench and read a book.',
      'It was a very relaxing afternoon.'
    ],
    translations: [
      '今天我去了公园。',
      '天气很好，很温暖。',
      '我看到很多孩子在草地上玩耍。',
      '一些狗在四处奔跑。',
      '有一个小池塘，里面有鸭子在游泳。',
      '我坐在长椅上看书。',
      '这是一个非常放松的下午。'
    ],
    questions: [
      { question: 'Where did the speaker go?', options: ['School', 'Park', 'Store', 'Library'], answer: 1 },
      { question: 'What was the weather like?', options: ['Cold and rainy', 'Hot and dry', 'Nice and warm', 'Windy and cool'], answer: 2 },
      { question: 'What were the children doing?', options: ['Swimming', 'Reading', 'Running', 'Playing'], answer: 3 },
      { question: 'What did the speaker do on the bench?', options: ['Slept', 'Ate lunch', 'Read a book', 'Played games'], answer: 2 }
    ],
    keywords: {
      beginner: ['park', 'weather', 'children', 'dogs', 'pond', 'bench', 'book'],
      intermediate: ['playing', 'running', 'swimming', 'warm', 'small', 'relaxing'],
      advanced: ['grass', 'ducks', 'afternoon', 'sat']
    }
  },
  {
    id: 2,
    title: 'My Morning Routine',
    level: 'beginner',
    topic: 'daily life',
    description: 'Follow a simple morning routine from waking up to leaving home.',
    text: 'Every morning I wake up at seven o\'clock. First I brush my teeth and wash my face. Then I eat breakfast. I usually have milk and bread. After breakfast I get dressed. I take my bag and go to school. I always arrive on time.',
    sentences: [
      'Every morning I wake up at seven o\'clock.',
      'First I brush my teeth and wash my face.',
      'Then I eat breakfast.',
      'I usually have milk and bread.',
      'After breakfast I get dressed.',
      'I take my bag and go to school.',
      'I always arrive on time.'
    ],
    translations: [
      '每天早上我七点起床。',
      '首先我刷牙洗脸。',
      '然后我吃早餐。',
      '我通常喝牛奶吃面包。',
      '早餐后我穿好衣服。',
      '我拿上包去学校。',
      '我总是准时到达。'
    ],
    questions: [
      { question: 'What time does the speaker wake up?', options: ['Six o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Nine o\'clock'], answer: 1 },
      { question: 'What does the speaker do first?', options: ['Eat breakfast', 'Get dressed', 'Brush teeth and wash face', 'Take a bag'], answer: 2 },
      { question: 'What does the speaker usually have for breakfast?', options: ['Eggs and juice', 'Rice and fish', 'Milk and bread', 'Fruit and cereal'], answer: 2 },
      { question: 'How does the speaker go to school?', options: ['By bus', 'Walk', 'The passage doesn\'t say', 'By bike'], answer: 2 }
    ],
    keywords: {
      beginner: ['morning', 'wake', 'brush', 'teeth', 'breakfast', 'milk', 'bread', 'school'],
      intermediate: ['usually', 'dressed', 'always', 'arrive', 'clock'],
      advanced: ['wash', 'seven', 'first']
    }
  },
  {
    id: 3,
    title: 'A Family Dinner',
    level: 'beginner',
    topic: 'daily life',
    description: 'A simple story about having dinner together as a family.',
    text: 'Every Sunday my family has dinner together. My mother cooks delicious food. My father helps set the table. My sister and I talk about school. We share stories and laugh. After dinner we wash the dishes together. I love family dinner time.',
    sentences: [
      'Every Sunday my family has dinner together.',
      'My mother cooks delicious food.',
      'My father helps set the table.',
      'My sister and I talk about school.',
      'We share stories and laugh.',
      'After dinner we wash the dishes together.',
      'I love family dinner time.'
    ],
    translations: [
      '每个星期天我们家一起吃晚餐。',
      '我妈妈做美味的食物。',
      '我爸爸帮忙摆桌子。',
      '我和姐姐谈论学校的事。',
      '我们分享故事并大笑。',
      '晚餐后我们一起洗碗。',
      '我喜欢家庭晚餐时间。'
    ],
    questions: [
      { question: 'When does the family have dinner together?', options: ['Saturday', 'Sunday', 'Friday', 'Monday'], answer: 1 },
      { question: 'What does the mother do?', options: ['Sets the table', 'Washes dishes', 'Cooks food', 'Tells stories'], answer: 2 },
      { question: 'Who helps set the table?', options: ['Mother', 'Sister', 'Father', 'The speaker'], answer: 2 },
      { question: 'What do they do after dinner?', options: ['Watch TV', 'Wash dishes', 'Play games', 'Read books'], answer: 1 }
    ],
    keywords: {
      beginner: ['family', 'dinner', 'mother', 'father', 'sister', 'school', 'stories'],
      intermediate: ['together', 'cooks', 'delicious', 'helps', 'laugh', 'wash', 'dishes'],
      advanced: ['table', 'share', 'love']
    }
  },

  // ========== INTERMEDIATE ==========
  {
    id: 4,
    title: 'A Business Trip to London',
    level: 'intermediate',
    topic: 'travel',
    description: 'A professional travels to London for an important meeting.',
    text: 'Last month I took a business trip to London. I flew from New York early in the morning. The flight took about seven hours. When I arrived, I took a taxi to my hotel near the Thames River. The next day I had a meeting with some important clients. We discussed a new partnership agreement. After the meeting I visited the British Museum. It was a short but productive trip.',
    sentences: [
      'Last month I took a business trip to London.',
      'I flew from New York early in the morning.',
      'The flight took about seven hours.',
      'When I arrived, I took a taxi to my hotel near the Thames River.',
      'The next day I had a meeting with some important clients.',
      'We discussed a new partnership agreement.',
      'After the meeting I visited the British Museum.',
      'It was a short but productive trip.'
    ],
    translations: [
      '上个月我出差去了伦敦。',
      '我一大早就从纽约起飞了。',
      '飞行大约花了七个小时。',
      '到达后，我坐出租车去了泰晤士河附近的酒店。',
      '第二天我和一些重要客户开了会。',
      '我们讨论了一个新的合作协议。',
      '会后我参观了大英博物馆。',
      '这是一次短暂但高效的旅行。'
    ],
    questions: [
      { question: 'Where did the speaker fly from?', options: ['London', 'Paris', 'New York', 'Tokyo'], answer: 2 },
      { question: 'How long was the flight?', options: ['Three hours', 'Five hours', 'Seven hours', 'Nine hours'], answer: 2 },
      { question: 'What did they discuss with the clients?', options: ['A new product', 'A partnership agreement', 'A marketing plan', 'A budget proposal'], answer: 1 },
      { question: 'What did the speaker do after the meeting?', options: ['Went back to the hotel', 'Visited a museum', 'Had dinner', 'Went shopping'], answer: 1 }
    ],
    keywords: {
      beginner: ['business', 'trip', 'London', 'hotel', 'meeting', 'clients'],
      intermediate: ['flight', 'arrived', 'taxi', 'discussed', 'partnership', 'visited', 'museum'],
      advanced: ['productive', 'agreement', 'Thames']
    }
  },
  {
    id: 5,
    title: 'The History of the Internet',
    level: 'intermediate',
    topic: 'technology',
    description: 'A brief overview of how the internet was developed.',
    text: 'The internet was first developed in the 1960s as a project for the United States military. It was called ARPANET. In the 1970s, scientists found a way to connect different networks together. This was the beginning of the internet as we know it. In the 1990s, the World Wide Web was invented by Tim Berners-Lee. This made the internet easy for everyone to use. Today billions of people around the world use the internet every day.',
    sentences: [
      'The internet was first developed in the 1960s as a project for the United States military.',
      'It was called ARPANET.',
      'In the 1970s, scientists found a way to connect different networks together.',
      'This was the beginning of the internet as we know it.',
      'In the 1990s, the World Wide Web was invented by Tim Berners-Lee.',
      'This made the internet easy for everyone to use.',
      'Today billions of people around the world use the internet every day.'
    ],
    translations: [
      '互联网最初是在20世纪60年代作为美国军方的一个项目开发的。',
      '它被称为ARPANET。',
      '在20世纪70年代，科学家们找到了一种连接不同网络的方法。',
      '这就是我们所知的互联网的开端。',
      '在20世纪90年代，蒂姆·伯纳斯-李发明了万维网。',
      '这使得互联网对每个人来说都很容易使用。',
      '如今全世界有数十亿人每天都在使用互联网。'
    ],
    questions: [
      { question: 'Who first developed the internet?', options: ['A university', 'US military', 'A private company', 'European scientists'], answer: 1 },
      { question: 'What was the early internet called?', options: ['World Wide Web', 'Internet', 'ARPANET', 'NetConnect'], answer: 2 },
      { question: 'When was the World Wide Web invented?', options: ['1960s', '1970s', '1980s', '1990s'], answer: 3 },
      { question: 'Who invented the World Wide Web?', options: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Alan Turing'], answer: 2 }
    ],
    keywords: {
      beginner: ['internet', 'project', 'military', 'networks', 'world', 'people'],
      intermediate: ['developed', 'scientists', 'connect', 'invented', 'billions', 'easy'],
      advanced: ['ARPANET', 'World Wide Web', 'Tim Berners-Lee']
    }
  },
  {
    id: 6,
    title: 'Healthy Eating Habits',
    level: 'intermediate',
    topic: 'health',
    description: 'Tips and advice for maintaining a healthy diet.',
    text: 'Eating healthy food is important for your body and mind. You should eat a variety of fruits and vegetables every day. Whole grains like rice and oats give you energy. Protein from fish, eggs, or beans helps your muscles grow. It is also important to drink plenty of water. Try to avoid too much sugar and processed food. Remember, a balanced diet leads to a healthy life.',
    sentences: [
      'Eating healthy food is important for your body and mind.',
      'You should eat a variety of fruits and vegetables every day.',
      'Whole grains like rice and oats give you energy.',
      'Protein from fish, eggs, or beans helps your muscles grow.',
      'It is also important to drink plenty of water.',
      'Try to avoid too much sugar and processed food.',
      'Remember, a balanced diet leads to a healthy life.'
    ],
    translations: [
      '吃健康的食物对你的身心都很重要。',
      '你每天应该吃各种水果和蔬菜。',
      '大米和燕麦等全谷物给你能量。',
      '来自鱼、蛋或豆类的蛋白质帮助你的肌肉生长。',
      '喝足够的水也很重要。',
      '尽量避开太多糖分和加工食品。',
      '记住，均衡的饮食带来健康的生活。'
    ],
    questions: [
      { question: 'What should you eat every day according to the passage?', options: ['Only meat', 'Fruits and vegetables', 'Processed food', 'Only grains'], answer: 1 },
      { question: 'What gives you energy from grains?', options: ['Protein', 'Vitamins', 'Whole grains', 'Sugar'], answer: 2 },
      { question: 'What helps your muscles grow?', options: ['Sugar', 'Protein', 'Water', 'Oats'], answer: 1 },
      { question: 'What should you avoid?', options: ['Water', 'Vegetables', 'Sugar and processed food', 'Fruits'], answer: 2 }
    ],
    keywords: {
      beginner: ['healthy', 'food', 'fruits', 'vegetables', 'water', 'sugar'],
      intermediate: ['important', 'variety', 'energy', 'protein', 'muscles', 'avoid', 'balanced'],
      advanced: ['grains', 'processed', 'diet', 'plenty']
    }
  },

  // ========== ADVANCED ==========
  {
    id: 7,
    title: 'Climate Change and Our Future',
    level: 'advanced',
    topic: 'environment',
    description: 'A discussion on the impact of climate change and what we can do.',
    text: 'Climate change is one of the most significant challenges facing humanity today. Rising global temperatures have led to melting polar ice caps and more extreme weather events. Scientists warn that if we do not reduce carbon emissions, the consequences could be catastrophic. However, there are solutions. Renewable energy sources like solar and wind power are becoming more affordable. Individuals can also make a difference by reducing waste and conserving energy. Collective action is essential to protect our planet for future generations.',
    sentences: [
      'Climate change is one of the most significant challenges facing humanity today.',
      'Rising global temperatures have led to melting polar ice caps and more extreme weather events.',
      'Scientists warn that if we do not reduce carbon emissions, the consequences could be catastrophic.',
      'However, there are solutions.',
      'Renewable energy sources like solar and wind power are becoming more affordable.',
      'Individuals can also make a difference by reducing waste and conserving energy.',
      'Collective action is essential to protect our planet for future generations.'
    ],
    translations: [
      '气候变化是当今人类面临的最重大挑战之一。',
      '全球气温上升导致极地冰盖融化和更多极端天气事件。',
      '科学家警告说，如果我们不减少碳排放，后果可能是灾难性的。',
      '不过，还是有解决方案的。',
      '太阳能和风能等可再生能源正变得越来越实惠。',
      '个人也可以通过减少浪费和节约能源来发挥作用。',
      '集体行动对于保护我们的地球以备后代使用至关重要。'
    ],
    questions: [
      { question: 'What has rising global temperatures led to?', options: ['More rainfall', 'Melting ice caps and extreme weather', 'Better farming', 'Longer summers'], answer: 1 },
      { question: 'What do scientists warn about?', options: ['Population growth', 'Economic crisis', 'Carbon emissions consequences', 'Sea pollution'], answer: 2 },
      { question: 'What renewable energy sources are mentioned?', options: ['Nuclear and coal', 'Solar and wind', 'Hydro and gas', 'Geothermal and biomass'], answer: 1 },
      { question: 'How can individuals help?', options: ['Drive more', 'Use more electricity', 'Reduce waste and conserve energy', 'Eat more meat'], answer: 2 }
    ],
    keywords: {
      beginner: ['climate', 'change', 'future', 'energy', 'solar', 'wind'],
      intermediate: ['significant', 'challenges', 'temperature', 'extreme', 'reduce', 'solutions', 'affordable'],
      advanced: ['catastrophic', 'emissions', 'renewable', 'conserving', 'collective', 'essential', 'generations']
    }
  },
  {
    id: 8,
    title: 'The Art of Negotiation',
    level: 'advanced',
    topic: 'business',
    description: 'Key strategies for successful negotiation in professional settings.',
    text: 'Successful negotiation requires careful preparation and strategic thinking. Before entering any negotiation, you should research the other party\'s interests and establish clear objectives. Active listening is perhaps the most underrated skill in negotiation. By understanding what the other side truly needs, you can propose solutions that benefit both parties. It is also important to remain patient and avoid making impulsive decisions. Remember that the best negotiations create value for everyone involved, not just one side. A win-win outcome should always be the ultimate goal.',
    sentences: [
      'Successful negotiation requires careful preparation and strategic thinking.',
      'Before entering any negotiation, you should research the other party\'s interests and establish clear objectives.',
      'Active listening is perhaps the most underrated skill in negotiation.',
      'By understanding what the other side truly needs, you can propose solutions that benefit both parties.',
      'It is also important to remain patient and avoid making impulsive decisions.',
      'Remember that the best negotiations create value for everyone involved, not just one side.',
      'A win-win outcome should always be the ultimate goal.'
    ],
    translations: [
      '成功的谈判需要精心的准备和战略思维。',
      '在进入任何谈判之前，你应该研究对方的利益并确立明确的目标。',
      '积极倾听也许是谈判中最被低估的技能。',
      '通过理解对方真正需要什么，你可以提出对双方都有利的解决方案。',
      '保持耐心并避免做出冲动的决定也很重要。',
      '记住，最好的谈判是为所有参与者创造价值，而不仅仅是一方。',
      '双赢的结果应该始终是最终目标。'
    ],
    questions: [
      { question: 'What should you do before entering a negotiation?', options: ['Prepare arguments only', 'Research interests and set objectives', 'Plan your exit strategy', 'Gather a team'], answer: 1 },
      { question: 'What is described as the most underrated skill?', options: ['Public speaking', 'Active listening', 'Data analysis', 'Time management'], answer: 1 },
      { question: 'What should you avoid in negotiation?', options: ['Asking questions', 'Making notes', 'Impulsive decisions', 'Setting goals'], answer: 2 },
      { question: 'What should be the ultimate goal?', options: ['Winning at all costs', 'Quick agreement', 'A win-win outcome', 'Getting the best price'], answer: 2 }
    ],
    keywords: {
      beginner: ['negotiation', 'preparation', 'objectives', 'decisions', 'value', 'goal'],
      intermediate: ['strategic', 'research', 'interests', 'propose', 'patient', 'benefit', 'involved'],
      advanced: ['underrated', 'impulsive', 'ultimate', 'win-win', 'outcome']
    }
  },
  {
    id: 9,
    title: 'Exploring Cultural Differences',
    level: 'advanced',
    topic: 'culture',
    description: 'Understanding and appreciating cultural differences in a globalized world.',
    text: 'In our increasingly interconnected world, understanding cultural differences has become more important than ever. What is considered polite in one culture might be offensive in another. For example, maintaining direct eye contact is a sign of confidence in Western cultures, but in some Asian cultures it can be seen as disrespectful. Similarly, the concept of personal space varies significantly across cultures. The key to navigating these differences is cultural intelligence, which involves being aware of your own cultural assumptions and adapting your behavior accordingly. Travel is one of the best ways to develop this awareness.',
    sentences: [
      'In our increasingly interconnected world, understanding cultural differences has become more important than ever.',
      'What is considered polite in one culture might be offensive in another.',
      'For example, maintaining direct eye contact is a sign of confidence in Western cultures, but in some Asian cultures it can be seen as disrespectful.',
      'Similarly, the concept of personal space varies significantly across cultures.',
      'The key to navigating these differences is cultural intelligence.',
      'This involves being aware of your own cultural assumptions and adapting your behavior accordingly.',
      'Travel is one of the best ways to develop this awareness.'
    ],
    translations: [
      '在我们这个日益互联的世界中，理解文化差异变得比以往任何时候都重要。',
      '在一种文化中被视为礼貌的行为在另一种文化中可能是冒犯的。',
      '例如，保持直接的眼神接触在西方文化中是自信的表现，但在一些亚洲文化中可能被视为不尊重。',
      '同样，个人空间的概念在不同文化中也差异很大。',
      '应对这些差异的关键是文化智力。',
      '这包括意识到自己的文化假设并相应调整自己的行为。',
      '旅行是培养这种意识的最佳方式之一。'
    ],
    questions: [
      { question: 'Why is understanding cultural differences more important now?', options: ['More people travel', 'The world is more interconnected', 'There are more cultures', 'People are more sensitive'], answer: 1 },
      { question: 'How is direct eye contact viewed in Western cultures?', options: ['As disrespectful', 'As a sign of confidence', 'As aggressive', 'As unimportant'], answer: 1 },
      { question: 'What is the key to navigating cultural differences?', options: ['Learning languages', 'Cultural intelligence', 'Making friends abroad', 'Reading travel books'], answer: 1 },
      { question: 'What is one of the best ways to develop cultural awareness?', options: ['Watching movies', 'Travel', 'Reading books', 'Online courses'], answer: 1 }
    ],
    keywords: {
      beginner: ['cultural', 'world', 'polite', 'cultures', 'travel', 'awareness'],
      intermediate: ['understanding', 'important', 'confidence', 'personal', 'behavior', 'develop'],
      advanced: ['interconnected', 'offensive', 'disrespectful', 'concept', 'navigating', 'intelligence', 'assumptions']
    }
  }
];