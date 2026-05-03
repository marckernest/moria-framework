export const stages = [
  {
    id: 'map',
    name: 'The Shire',
    moiraStage: 'Map',
    letter: 'M',
    position: { x: 15, y: 68 },
    content: {
      title: 'M — Map',
      subtitle: 'Understanding the problem space',
      intro: 'Something draws you in. You sense there is more beneath the surface, and before you can do anything useful you need to understand what you are actually dealing with. Mapping is that first act of navigation. Not fixing, not diagnosing. Just understanding the shape of the world you have entered.',
      steps: [
        {
          heading: 'Identify the system boundaries',
          body: 'Every problem lives inside a system. Before you touch anything, you need to know what is inside and what is outside it. For Joe, the system ran from Pillars Hub through to Passion.io. The boundary question: where does a completed payment end, and where does app access begin? That gap turned out to be the entire problem.',
        },
        {
          heading: 'Surface the stocks and flows',
          body: 'A stock is anything that accumulates over time. A flow is what feeds it or drains it. The stock that mattered was app subscribers. The flow was new orders from Pillars Hub. Orders were arriving, money was moving, but none of it was reaching Zapier. The stock was being maintained manually, which made it fragile and dependent on a person.',
        },
        {
          heading: 'Find the feedback loops',
          body: 'A feedback loop is what tells a system whether it is working. That loop had broken in Joe\'s case, and the most dangerous part was that nobody knew. No errors, no alerts, no visible sign. The absence of feedback was itself the problem.',
        },
        {
          heading: 'Spot the assumptions',
          body: 'Joe assumed Zapier was running. He assumed the API supported the queries the integration needed. Both were wrong. The REST API did not support date-based filtering. That assumption is what allowed the Zap to appear to be working while actually doing nothing.',
        },
        {
          heading: 'Define the desired state',
          body: 'Get clear on what a working version actually looks like. For Joe: every new order should automatically trigger app access within minutes, with no human intervention. And when something goes wrong, it should surface rather than disappear quietly.',
        },
      ],
    },
  },
  {
    id: 'orientate',
    name: 'Rivendell',
    moiraStage: 'Orientate',
    letter: 'O',
    position: { x: 35, y: 42 },
    content: {
      title: 'O — Orientate',
      subtitle: 'The journey from the Shire to the Council of Elrond',
      intro: 'Something is wrong, but you do not know what yet. You leave the comfort of what you thought you understood and you start moving toward clarity. The road is not straight. It never is.',
      steps: [
        {
          heading: 'Challenge the obvious — Gandalf arrives',
          body: 'Before Frodo leaves the Shire, Gandalf does not confirm what everyone assumes. He tests it. Everyone assumed Zapier was the problem. Testing it revealed that Zapier was not broken at all. It simply was not running. One test. One distinction. Everything opens up.',
        },
        {
          heading: 'Follow the silence — the road is darker than expected',
          body: 'Sixty days. Zero Zap runs. No errors. No alerts. The system was not failing loudly. It was failing quietly, with no one the wiser. Silence is not the absence of information. It is information. When something should be happening and is not, that gap is your signal. Follow it.',
        },
        {
          heading: 'Go upstream — Strider knows the terrain',
          body: 'Going upstream means refusing to fix the symptom until you have found the source. The Zap was not running because the trigger was not firing. The trigger was not firing because the API was not returning anything. The API was not returning anything because it required parameters that had never been passed.',
        },
        {
          heading: 'Name it precisely — the Council of Elrond',
          body: 'The diagnosis landed cleanly: Pillars Hub and Passion.io had never truly been connected. Not a broken Zap. Not a misconfiguration. A structural gap between two systems with no shared language. The moment you can say that, clearly and specifically, you are ready to move.',
        },
      ],
    },
  },
  {
    id: 'reason',
    name: 'The Council of Elrond',
    moiraStage: 'Reason',
    letter: 'R',
    position: { x: 52, y: 28 },
    content: {
      title: 'R — Reason',
      subtitle: 'From diagnosis to design',
      intro: 'The ring has been named. Everyone in the room understands what they are dealing with. Understanding the problem is not the same as knowing what to do about it. Reason is the shift from diagnosis to design.',
      steps: [
        {
          heading: 'Hold every option to the fire',
          body: 'Every option is surfaced, held up to scrutiny, and tested until it either holds or collapses. Could the existing Zap be fixed? No. Could the REST API be used as-is? No. Could GraphQL solve it? Possibly, but only with the right structure. You do not arrive at the right answer. You eliminate the wrong ones until only one remains.',
        },
        {
          heading: 'Design for Moria, not the map',
          body: 'Good architecture accounts for the environment it has to survive in. Marck designed for reality: a six-minute execution timeout in Google Apps Script, an API that needed batched requests, a Zapier trigger that needed a clean signal. Google Sheets became the bridge. Apps Script handled the incremental pull. Zapier reacted to a new row and granted access.',
        },
        {
          heading: 'Assign the fellowship',
          body: 'Each member has a role that matches their capability. Pillars Hub owns the order data. Apps Script owns the translation layer. Google Sheets owns the handoff. Zapier owns the access grant. Each component does one thing well.',
        },
        {
          heading: 'Leave Rivendell',
          body: 'Reason ends with a decision. Not a hypothesis. Not a working theory. A committed direction. For Joe, the decision was made: GraphQL bridge, incremental date-stamping, Sheets as the intermediary, Zap on new row. The architecture was set. Time to enter the mines.',
        },
      ],
    },
  },
  {
    id: 'implement',
    name: 'The Mines of Moria',
    moiraStage: 'Implement',
    letter: 'I',
    position: { x: 65, y: 58 },
    content: {
      title: 'I — Implement',
      subtitle: 'Executing through the dark',
      intro: 'The fellowship leaves Rivendell with a plan. They enter Moria with conviction. What they find inside is something no plan fully prepares you for. Implement is not where you think. It is where you do.',
      steps: [
        {
          heading: 'Build the first version — enter the mines',
          body: 'You commit to the path knowing you cannot see everything ahead. Marck built the initial API connection, ran it, and got zero orders back. That was not failure. That was the first step into Moria. You do not wait until you can see the whole tunnel. You enter, and you start learning.',
        },
        {
          heading: 'Find the failure point — the dwarves are dead',
          body: 'The failure point was the filter group parameter — a missing requirement that the API needed and the integration had never passed. Precise diagnosis mid-execution is what separates progress from going in circles.',
        },
        {
          heading: 'Adapt without abandoning — Pippin drops the stone',
          body: 'The mission does not change. Marck switched from REST to GraphQL, reduced the batch size, added incremental date-stamping. Different approach. Same destination.',
        },
        {
          heading: 'Respect the limits, ask for help — Gandalf and the Balrog',
          body: 'The six-minute execution timeout was not a bug to fix. It was a boundary to design around. When the GraphQL syntax exceeded what Marck could solve alone, the Pillars Hub API team was brought in. You bring Gandalf forward when the Balrog shows up.',
        },
        {
          heading: "Confirm it's working — the Fellowship emerges",
          body: 'The script executed. The sheet updated. The Zap fired. A subscriber got access without anyone touching it manually. That moment — not when you think it should work, but when you can see that it does — is when Implement ends and Amplify begins.',
        },
      ],
    },
  },
  {
    id: 'amplify',
    name: 'Lothlorien',
    moiraStage: 'Amplify',
    letter: 'A',
    position: { x: 80, y: 38 },
    content: {
      title: 'A — Amplify',
      subtitle: "Reflecting, iterating, and leveling up for what's next",
      intro: 'The Fellowship arrives in Lothlórien and something shifts. The urgency gives way to something quieter and more deliberate. The solution is live. The system is working. Now you ask the harder question: what do we do with that?',
      steps: [
        {
          heading: 'Rest, sharpen, rise',
          body: "When a solution goes live, resist the urge to immediately reach for the next problem. Joe's integration was running on a four-hour cycle, subscribers were getting access automatically, and support tickets were dropping. You scale the thing that is holding. You clean up what is still rough. Rest, sharpen, rise.",
        },
        {
          heading: 'Look in the mirror',
          body: 'After a hard engagement, there is a moment where you ask yourself some honest questions. What did this reveal about where my real capability lies? What do I want to be doing more of? On one of the calls with Joe, Marck said it out loud. He wished he had more time for work like this. The mirror shows you what is true.',
        },
        {
          heading: 'The fellowship deepens',
          body: 'A solved problem is proof that you understood the real issue, that you built something that holds, that you can be trusted with the next hard thing. With Joe, the momentum of a working solution became the foundation of an ongoing partnership. The fellowship deepens because the work earned it.',
        },
        {
          heading: 'The gifts travel',
          body: 'The Google Sheets bridge, the Apps Script translation layer, the Zapier trigger on new row — that architecture did not stay with Joe. It became a reusable pattern carried into multiple subsequent clients. One hard problem solved at depth produced a methodology that traveled. The gift compounds.',
        },
      ],
    },
  },
]
