# The MORIA Framework — Marck Ernest

· · · · ·

The MORIA Framework

Follow the journey from broken system to working solution.
A real case study with Joe M., guided by the MORIA framework.

Lost in the problem? The map is here.

M O R I A

CARTOGRAPHER
Marck Ernest

---

## The Shire — Map

M — Map
Map
Understanding the problem space

Something draws you in. You sense there is more beneath the surface, and before you can do anything useful you need to understand what you are actually dealing with. Mapping is that first act of navigation. Not fixing, not diagnosing. Just understanding the shape of the world you have entered.

1. Identify the system boundaries
Every problem lives inside a system. Before you touch anything, you need to know what is inside and what is outside it. For Joe, the system ran from Pillars Hub through to Passion.io. The boundary question: where does a completed payment end, and where does app access begin? That gap turned out to be the entire problem.

2. Surface the stocks and flows
A stock is anything that accumulates over time. A flow is what feeds it or drains it. The stock that mattered was app subscribers. The flow was new orders from Pillars Hub. Orders were arriving, money was moving, but none of it was reaching Zapier. The stock was being maintained manually, which made it fragile and dependent on a person.

3. Find the feedback loops
A feedback loop is what tells a system whether it is working. That loop had broken in Joe's case, and the most dangerous part was that nobody knew. No errors, no alerts, no visible sign. The absence of feedback was itself the problem.

4. Spot the assumptions
Joe assumed Zapier was running. He assumed the API supported the queries the integration needed. Both were wrong. The REST API did not support date-based filtering. That assumption is what allowed the Zap to appear to be working while actually doing nothing.

5. Define the desired state
Get clear on what a working version actually looks like. For Joe: every new order should automatically trigger app access within minutes, with no human intervention. And when something goes wrong, it should surface rather than disappear quietly.

---

## Rivendell — Orientate

O — Orientate
Orientate
The journey from the Shire to the Council of Elrond

Something is wrong, but you do not know what yet. You leave the comfort of what you thought you understood and you start moving toward clarity. The road is not straight. It never is.

Challenge the obvious — Gandalf arrives
Before Frodo leaves the Shire, Gandalf does not confirm what everyone assumes. He tests it. Everyone assumed Zapier was the problem. Testing it revealed that Zapier was not broken at all. It simply was not running. One test. One distinction. Everything opens up.

Follow the silence — the road is darker than expected
Sixty days. Zero Zap runs. No errors. No alerts. The system was not failing loudly. It was failing quietly, with no one the wiser. Silence is not the absence of information. It is information. When something should be happening and is not, that gap is your signal. Follow it.

Go upstream — Strider knows the terrain
Going upstream means refusing to fix the symptom until you have found the source. The Zap was not running because the trigger was not firing. The trigger was not firing because the API was not returning anything. The API was not returning anything because it required parameters that had never been passed.

Name it precisely — the Council of Elrond
The diagnosis landed cleanly: Pillars Hub and Passion.io had never truly been connected. Not a broken Zap. Not a misconfiguration. A structural gap between two systems with no shared language. The moment you can say that, clearly and specifically, you are ready to move.

---

## The Council — Reason

R — Reason
Reason
From diagnosis to design

The ring has been named. Everyone in the room understands what they are dealing with. Understanding the problem is not the same as knowing what to do about it. Reason is the shift from diagnosis to design.

Hold every option to the fire
Every option is surfaced, held up to scrutiny, and tested until it either holds or collapses. Could the existing Zap be fixed? No. Could the REST API be used as-is? No. Could GraphQL solve it? Possibly, but only with the right structure. You do not arrive at the right answer. You eliminate the wrong ones until only one remains.

Design for Moria, not the map
Good architecture accounts for the environment it has to survive in. Marck designed for reality: a six-minute execution timeout in Google Apps Script, an API that needed batched requests, a Zapier trigger that needed a clean signal. Google Sheets became the bridge. Apps Script handled the incremental pull. Zapier reacted to a new row and granted access.

Assign the fellowship
Each member has a role that matches their capability. Pillars Hub owns the order data. Apps Script owns the translation layer. Google Sheets owns the handoff. Zapier owns the access grant. Each component does one thing well.

Leave Rivendell
Reason ends with a decision. Not a hypothesis. Not a working theory. A committed direction. For Joe, the decision was made: GraphQL bridge, incremental date-stamping, Sheets as the intermediary, Zap on new row. The architecture was set. Time to enter the mines.

---

## Moria — Implement

I — Implement
Implement
Executing through the dark

The fellowship leaves Rivendell with a plan. They enter Moria with conviction. What they find inside is something no plan fully prepares you for. Implement is not where you think. It is where you do.

Build the first version — enter the mines
You commit to the path knowing you cannot see everything ahead. Marck built the initial API connection, ran it, and got zero orders back. That was not failure. That was the first step into Moria. You do not wait until you can see the whole tunnel. You enter, and you start learning.

Find the failure point — the dwarves are dead
The failure point was the filter group parameter — a missing requirement that the API needed and the integration had never passed. Precise diagnosis mid-execution is what separates progress from going in circles.

Adapt without abandoning — Pippin drops the stone
The mission does not change. Marck switched from REST to GraphQL, reduced the batch size, added incremental date-stamping. Different approach. Same destination.

Respect the limits, ask for help — Gandalf and the Balrog
The six-minute execution timeout was not a bug to fix. It was a boundary to design around. When the GraphQL syntax exceeded what Marck could solve alone, the Pillars Hub API team was brought in. You bring Gandalf forward when the Balrog shows up.

Confirm it's working — the Fellowship emerges
The script executed. The sheet updated. The Zap fired. A subscriber got access without anyone touching it manually. That moment — not when you think it should work, but when you can see that it does — is when Implement ends and Amplify begins.

---

## Lothlórien — Amplify

A — Amplify
Amplify
Reflecting, iterating, and leveling up for what's next

The Fellowship arrives in Lothlórien and something shifts. The urgency gives way to something quieter and more deliberate. The solution is live. The system is working. Now you ask the harder question: what do we do with that?

Rest, sharpen, rise
When a solution goes live, resist the urge to immediately reach for the next problem. Joe's integration was running on a four-hour cycle, subscribers were getting access automatically, and support tickets were dropping. You scale the thing that is holding. You clean up what is still rough. Rest, sharpen, rise.

Look in the mirror
After a hard engagement, there is a moment where you ask yourself some honest questions. What did this reveal about where my real capability lies? What do I want to be doing more of? On one of the calls with Joe, Marck said it out loud. He wished he had more time for work like this. The mirror shows you what is true.

The fellowship deepens
A solved problem is proof that you understood the real issue, that you built something that holds, that you can be trusted with the next hard thing. With Joe, the momentum of a working solution became the foundation of an ongoing partnership. The fellowship deepens because the work earned it.

The gifts travel
The Google Sheets bridge, the Apps Script translation layer, the Zapier trigger on new row — that architecture did not stay with Joe. It became a reusable pattern carried into multiple subsequent clients. One hard problem solved at depth produced a methodology that traveled. The gift compounds.

---

## About Marck Ernest

I have always been drawn to how things work — the sheer mechanics of a system, the physics beneath the surface. My father was a carpenter. I learned young that machines operated on principles, not magic. Understanding that process has been the constant thread.

I believe with enough time and sincere effort, anyone can understand these solutions and repeat the process.

My partner once joked that I am Gandalf, and that deliverables arrive precisely when they mean to.

The MORIA framework is how I navigate complexity. If you are running on empty and looking for a path through, this map was made for you.
