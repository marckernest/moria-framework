# **The MORIA Framework**

*A systems thinking methodology for problem solving*

**Map. Orientate. Reason. Implement. Amplify.**

*The following case study uses Joe Melling**'**s API diagnostics engagement to illustrate each stage of the MORIA framework in practice.*

# **M  —  Map**

*The Shire — understanding the problem space*

Something draws you in. You sense there is more beneath the surface, and before you can do anything useful you need to understand what you are actually dealing with. Map is that first act of orientation — not fixing, not diagnosing, just understanding the shape of the world you have entered.

## **1. Identify the system boundaries**

The system in scope: Pillars Hub (payment processor) to some mechanism to recognize a purchase to Passion.io app access. Out of scope: Joe's content, his warehouse operations, his physical product business. The boundary question that mattered was where does a completed payment end, and where does app access begin? That gap was the entire problem.

## **2. Surface the stocks and flows**

The stock that mattered was app subscribers — the accumulating pool of paying customers who should have access. The flow that was supposed to feed it was new orders from Pillars Hub. What we found: the flow had effectively stopped. Orders were coming in, money was moving, but zero were reaching Zapier. The stock was being maintained manually, which meant it was fragile, slow, and dependent on a person.

## **3. Find the feedback loops**

There was a balancing loop that should have existed — new order triggers Zap, Zap grants access, subscriber count grows. That loop had broken and no one knew. The silent failure meant there was no signal going back to Joe that the system was not working. The absence of feedback was itself the core of the problem. Without a visible error, no one was prompted to investigate.

## **4. Spot the assumptions**

Joe assumed Zapier was running. Joe assumed the API supported the kind of queries needed. Both were wrong. The Pillars Hub REST API did not support date-based filtering, which meant you could not reliably ask it "what's new since last time?" That assumption — that the API would behave like a standard REST API — is what made the Zap appear to work while actually doing nothing.

## **5. Define the desired state**

Every new Pillars Hub order for product APP 001 automatically triggers app access within minutes, without human intervention. The system is observable — meaning failures surface rather than disappear silently.

# **O  —  Orientate**

*The journey from the Shire to the Council of Elrond*

Something is wrong, but you do not know what yet. You leave the comfort of what you thought you understood — the familiar, the assumed, the obvious — and you start moving toward clarity. The road is not straight. It never is.

## **Challenge the obvious — Gandalf arrives with an uneasy question**

Before Frodo leaves the Shire, Gandalf does not confirm what everyone assumes. He tests it. He throws the ring into the fire. The most dangerous thing you can do in an investigation is treat the obvious answer as settled before you have verified it. In Joe's case, everyone assumed Zapier was the problem. It was the most visible thing. But testing it first — not to prove it guilty, but to rule it out — revealed that Zapier was not broken at all. It simply was not running. One test. One distinction. Everything opens up.

## **Follow the silence — the road is darker than expected**

Frodo leaves expecting a manageable journey and discovers the threat is far older and more structural than the Shire ever prepared him for. The Nazgul are not chasing a hobbit — they are after something that runs beneath the surface. Sixty days. Zero Zap runs. No errors. No alerts. The system was not failing loudly. It was failing in the dark. Silence is not the absence of information. It is information. When something should be happening and is not, that gap is your signal. Follow it.

## **Go upstream — Strider knows the terrain**

At the Prancing Pony, Frodo meets someone who has been navigating this world long before Frodo knew it existed. Strider does not react to what is in front of him. He traces it back — who sent the Nazgul, where they came from, what they are really after. Going upstream means refusing to fix the symptom until you have found the source. The Zap was not running because the trigger was not firing. The trigger was not firing because the API was not returning anything. The API was not returning anything because it required parameters that had never been passed. You keep tracing back until you find the origin.

## **Name it precisely — the Council of Elrond**

Every faction arrives at Rivendell with a piece of the truth. It is only when they sit together — openly, without agenda — that the full picture emerges. The ring cannot be hidden. It cannot be delegated. It has to be named for what it is and dealt with at the source. For Joe, that moment was the three-way call. The diagnosis landed cleanly: Pillars Hub and Passion.io had never truly been connected. Not a broken Zap. Not a misconfiguration. A structural gap between two systems with no shared language. The moment you can say that — clearly, specifically, without hedging — you are ready to move.

# **R  —  Reason**

*The Council of Elrond — from diagnosis to design*

The ring has been named. Everyone in the room understands what they are dealing with. But understanding the problem is not the same as knowing what to do about it. Reason is the shift from diagnosis to design — the moment the Council stops asking what is this and starts asking what do we do about it.

## **Hold every option to the fire**

The Council does not immediately agree on a path. Every option is surfaced, held up to scrutiny, and tested until it either holds or collapses. Could the ring be hidden? No. Could it be used? No. Could it be passed to someone stronger? No. Each possibility burns away until one remains. In Joe's case, the same process played out. Could the existing Zap be fixed? No — the trigger architecture was wrong at the root. Could the Pillars Hub REST API be used as-is? No — it could not support date-based filtering. Could GraphQL solve it? Possibly — but only with the right structure built around it. You do not arrive at the right answer. You eliminate the wrong ones until only one remains.

## **Design for Moria, not the map**

The Fellowship does not plan for a comfortable journey. They plan for the actual road — cold, dark, and full of things that want to stop them. The map is not the territory. Good architecture accounts for the environment it has to survive in, not the environment you wish you were working in. Marck designed for reality: a six-minute execution timeout in Google Apps Script, an API that needed batched requests to avoid breaking, a Zapier trigger that needed a clean, reliable signal. Google Sheets became the bridge. Apps Script handled the incremental pull. Zapier did what it does best — react to a new row and grant access. Nothing exotic. The right tools, arranged correctly, built for the road that actually exists.

## **Assign the fellowship**

Frodo carries the ring. Gandalf carries the knowledge. Aragorn carries the sword. Each member of the Fellowship has a role that matches their capability — and no one carries more than they should. Good architecture works the same way. Pillars Hub owns the order data. Apps Script owns the translation layer. Google Sheets owns the handoff. Zapier owns the access grant. Each component does one thing well, and the system holds because the responsibilities are clean. When everything tries to do everything, nothing does anything reliably.

## **Leave Rivendell**

Reason ends with a decision. Not a hypothesis. Not a working theory. A committed direction. The Fellowship does not leave Rivendell halfway convinced — they set out knowing the road is hard and choosing to walk it anyway. That commitment is what makes Implement possible. For Joe, the decision was made: GraphQL bridge, incremental date-stamping, Sheets as the intermediary, Zap on new row. The architecture was set. The fellowship was assembled. Time to enter the mines.

# **I  —  Implement**

*The Mines of Moria — executing through the dark*

The fellowship leaves Rivendell with a plan. They enter Moria with conviction. What they find inside is something no plan fully prepares you for — darkness, obstacles, and the constant pressure to keep moving when everything in you wants to stop and reconsider. Implement is not where you think. It is where you do. And doing, in the dark, is harder than it looks from Rivendell.

## **Build the first version — enter the mines**

You commit to the path knowing you cannot see everything ahead. The first version of the solution is not the final version — it is the first step into the dark. Marck built the initial API connection, ran it, and got zero orders back. That was not failure. That was the first step into Moria. You do not wait until you can see the whole tunnel. You enter, and you start learning.

## **Find the failure point — the dwarves are dead**

The Fellowship arrives in Balin's tomb and discovers the environment is worse than anyone anticipated. Something has already gone wrong before they arrived. In Joe's case, the failure point was the filter group parameter — a missing requirement that the API needed and the integration had never passed. You locate the exact point of failure, not the general vicinity of it. Precise diagnosis mid-execution is what separates progress from spinning.

## **Adapt without abandoning — Pippin drops the stone**

Something sets off a chain reaction. The orcs arrive. The troll appears. The situation is louder and more chaotic than the plan accounted for. But the mission does not change — get through Moria. The Fellowship does not retreat to Rivendell to redesign the plan. They adapt to the immediate crisis without losing sight of where they are going. Marck switched from REST to GraphQL, reduced the batch size, added incremental date-stamping. Different approach. Same destination.

## **Respect the limits, ask for help — Gandalf and the Balrog**

Frodo gets stabbed and the mithril holds — but it is a warning. There are forces in here that exceed what any one person can handle alone. When the Balrog appears, Gandalf does not try to fight it and keep moving simultaneously. He makes a decision — I will handle this, you keep going. Respecting the limits means knowing when the constraint is environmental and when it is a capability gap. The six-minute execution timeout was not a bug to fix — it was a boundary to design around. And when the GraphQL syntax exceeded what Marck could solve alone, the Pillars Hub API team was brought in. You bring Gandalf forward when the Balrog shows up.

## **Confirm it****'****s working — the Fellowship emerges**

The remaining Fellowship steps out of Moria into the light. Battered, changed, one member fewer — but through. In Joe's case, there was a specific moment where the system ran unattended for the first time. The script executed. The sheet updated. The Zap fired. A subscriber got access without anyone touching it manually. That moment — not when you think it should work, but when you can see that it does — is when Implement ends and Amplify begins.

# **A  —  Amplify**

*Lothlorien — reflecting, iterating, and leveling up for what**'**s next*

The Fellowship arrives in Lothlorien broken and changed. Moria cost them something real. But Lothlorien does not let them stay broken. It offers something more valuable than comfort. It offers clarity. Space to understand what just happened, what it revealed, and what it makes possible going forward. Amplify is that space. A deliberate pause that makes everything that comes next stronger.

## **Rest, sharpen, rise**

When a solution goes live, resist the urge to immediately reach for the next problem. Observe first. Joe's integration was running on a four-hour cycle, subscribers were getting access automatically, and support tickets were dropping. That was the signal to lean in, not move on. You scale the thing that is holding. And while you are leaning in, you look for the edges that need sharpening. A live system in production reveals things a plan never could. Timing sensitivities, edge cases, moments where the architecture needs a little more robustness. You clean those up because now you can see the system clearly for the first time. Rest, sharpen, rise. Better equipped for what comes next than when you entered Moria.

## **Look in the mirror**

Galadriel's most important gift to Frodo is not something she hands him. She shows him something about himself. She offers him the ring and in that moment, under real pressure, Frodo has to look at who he is and what he is willing to carry. That kind of honest self-reflection belongs in Amplify. After a hard engagement like Joe's, after the debugging and the dead ends and the GraphQL timeout and the escalation to the Pillars Hub team, there is a moment where you ask yourself some uncomfortable questions. What did this reveal about where my real capability lies? What do I want to be doing more of? On one of the calls with Joe, Marck said it out loud. He wished he had more time for work like this. Technically complex, architecturally interesting, genuinely challenging. That is not a small thing to notice about yourself. The mirror shows you what is true.

## **The fellowship deepens**

In Lothlorien the bond between the Fellowship members deepens because of what they survived together in Moria. They did not just complete a task. They went through something. That shared experience changes the relationship permanently. A solved problem is proof. Proof that you understood the real issue, that you built something that holds, that you can be trusted with the next hard thing. With Joe, the momentum of a working solution became the foundation of an ongoing partnership. His app was profitable. His subscriber count was growing. And the relationship had earned a different kind of depth. You do not just move on after a win like that. You show up, you report what you are seeing, you ask what is next. The fellowship deepens because the work earned it.

## **The gifts travel**

Galadriel's gifts do not stay in Lothlorien. The light of Earendil saves Frodo in Shelob's lair, far from where it was given, in a context nobody anticipated when it was first offered. That is what a transferred pattern does. It shows up in places you did not expect, solving problems you have not encountered yet. The Google Sheets bridge, the Apps Script translation layer, the Zapier trigger on new row. That architecture did not stay with Joe. It became a reusable pattern that Marck carried into multiple subsequent clients with external checkouts. One hard problem solved at depth produced a methodology that traveled. The gift compounds. The solution outgrows the problem it was born in. And that, more than the subscriber count, more than the dropped support tickets, more than any single metric, is what Amplify is really about.