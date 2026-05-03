# **MORIA Framework -- Project Plan**

*marckernest.com/moria-framework*

**Delegation Key:**

**[Marck] **Requires uniquely human input    **[Celeste] **AI handles well    **[Together] **Highest impact through collaboration

# **Phase 1 -- Content**

All written content for the site. This phase should be completed before any build work begins.

## **1.1 Front Cover Copy**

*Status: In progress*

- Title: The MORIA Framework

- Tagline: Journey through MORIA. Where systems thinking meets real solutions.

- Lead line: Lost in the problem? The map is here.

- Cartographer credit: Marck Ernest** [Marck]**

- Drag gesture prompt copy -- subtle directional cue** [Together]**

## **1.2 Bio**

*Status: Source material gathered, draft to be written*

- Core positioning: the Gandalf to their Frodo -- a systems thinker who guides teams through complexity** [Marck]**

- The VCR story -- how Marck has always been drawn to understanding systems at the mechanical level** [Marck]**

- The patience and inclusion point -- anyone can understand these solutions with enough time and sincere effort** [Marck]**

- The Gandalf joke from partner -- verbatim if possible** [Marck]**

- Draft the bio from these inputs** [Together]**

## **1.3 Five MORIA Stage Panels**

*Status: Complete -- see MORIA_Framework_v2.docx*

- Map, Orientate, Reason, Implement, Amplify -- all written and approved** [Celeste]**

- Second pass review after seeing content in the actual site context** [Marck]**

## **1.4 Case Study Distillation**

*Status: Not started*

- Short punchy version of the Joe Melling story for non-technical readers** [Together]**

- One-paragraph summary emphasising the Gandalf dynamic** [Celeste]**

- Approval of final framing** [Marck]**

## **1.5 Back Cover Copy**

*Status: Not started*

- Synthesise the full MORIA journey into a closing statement** [Celeste]**

- Call to action -- how to reach Marck** [Marck]**

- Contact details and links** [Marck]**

# **Phase 2 -- Design**

All visual and interaction design decisions. Most of these are locked. Remaining items flagged below.

## **2.1 Locked Decisions**

- Colour palette: ink, paper, cream, rule, accent, accent-light, danger -- confirmed

- Typography: IM Fell English for headings, Crimson Text for body -- confirmed

- Layout: pannable zoomable map canvas with five city markers on a dotted journey path -- confirmed

- Interaction: click to expand with ink-bleed animation -- confirmed

- Mobile: pan and zoom with thumbs, same map experience -- confirmed

- Cover: folded map with horizontal drag-to-open gesture -- confirmed

- Terrain: sparse hills, forests, rivers -- CSS and SVG, flat and minimal -- confirmed

- Map feel: traveled, worn, someone has been here before -- confirmed

## **2.2 Open Design Decisions**

- Map composition -- where exactly the five cities sit, how the path curves, where terrain elements live** [Together]**

- City marker design -- size, shape, hand-placed quality** [Together]**

- Content panel layout -- how the stage content reads inside the expanded panel without breaking the map aesthetic** [Together]**

- Compass rose design -- decorative but purposeful** [Celeste]**

- Parchment texture weight -- how aged the paper feels** [Marck]**

# **Phase 3 -- Build**

React with Framer Motion, bundled with Vite. All code generation handled by Celeste, all feel decisions by Marck.

## **3.1 Project Setup**

- Vite + React scaffold, folder structure, dependencies installed** [Celeste]**

- Google Fonts loaded, CSS variables set up with colour palette** [Celeste]**

- GitLab repo created and connected** [Marck]**

## **3.2 Cover Component**

- Folded map visual with title, tagline, lead line, and cartographer credit** [Celeste]**

- Horizontal drag-to-open gesture with Framer Motion** [Celeste]**

- Swipe gesture on mobile** [Celeste]**

- Feel review -- drag resistance, snap behaviour, reveal quality** [Marck]**

## **3.3 Map Canvas Component**

- Pannable zoomable canvas with CSS transform system** [Celeste]**

- Parchment texture -- CSS noise, gradient layering, aged paper effect with fold lines** [Celeste]**

- SVG terrain -- sparse hills, forests, rivers in ink-line style** [Celeste]**

- Dotted journey path connecting the five cities** [Celeste]**

- Compass rose SVG** [Celeste]**

- Map composition review -- city placement, terrain balance, overall feel** [Marck]**

## **3.4 City Marker Component**

- Five markers: The Shire, Rivendell, The Council, Moria, Lothlorien** [Celeste]**

- Hand-placed quality, slight irregularity, cartographic label style** [Celeste]**

- Hover state and click interaction** [Celeste]**

- Marker feel review -- size, placement, readability** [Marck]**

## **3.5 Content Panel Component**

- Ink-bleed expand animation on city click** [Celeste]**

- Stage content layout -- heading, subtitle, method steps, case study** [Celeste]**

- Close or collapse interaction** [Celeste]**

- Readability and aesthetic review in context of the map** [Marck]**

## **3.6 Back Cover Component**

- Summary of the MORIA journey** [Celeste]**

- Bio section** [Together]**

- Contact details and call to action** [Marck]**

# **Phase 4 -- Assets**

All visual assets are CSS and SVG generated. No external illustration required.

## **4.1 SVG Elements**

- Hill clusters, forest textures, river lines -- all in ink-line cartographic style** [Celeste]**

- Compass rose** [Celeste]**

- City marker icons** [Celeste]**

- Decorative border treatment for the map edge** [Celeste]**

## **4.2 CSS Texture and Atmosphere**

- Parchment noise and grain overlay** [Celeste]**

- Edge darkening -- vignette effect to age the paper** [Celeste]**

- Fold line treatment** [Celeste]**

- Texture weight and aging feel review** [Marck]**

# **Phase 5 -- Deployment**

GitLab for version control, Vercel for hosting, marckernest.com/moria-framework as the final URL.

## **5.1 Repository Setup**

- Create GitLab repository for the project** [Marck]**

- Generate .gitlab-ci.yml for CI/CD pipeline** [Celeste]**

- Initial commit and push** [Marck]**

## **5.2 Vercel Setup**

- Connect GitLab repo to Vercel** [Marck]**

- Generate vercel.json configuration** [Celeste]**

- Configure base path for /moria-framework subdirectory** [Celeste]**

- First deployment and smoke test** [Together]**

## **5.3 Domain Configuration**

- Point marckernest.com to Vercel via DNS settings at domain registrar** [Marck]**

- DNS configuration guidance** [Celeste]**

- SSL certificate -- Vercel handles automatically** [Celeste]**

- Final URL verification at marckernest.com/moria-framework** [Marck]**

# **Phase 6 -- Iteration**

After first live deployment. The site will reveal things the plan could not anticipate.

- Review the full experience on desktop and mobile -- feel, flow, readability** [Marck]**

- Identify what feels off -- pacing, texture, content, interaction** [Marck]**

- Fix, refine, and redeploy** [Together]**

- Share with one trusted person for cold read feedback** [Marck]**

- Incorporate feedback and ship final version** [Together]**

# **Summary of Delegation**

**[Marck] **Bio source material, front cover positioning, all feel and composition reviews, domain and repo setup, final approval at every stage.

**[Celeste] **All code generation, SVG assets, CSS texture work, animation logic, CI/CD config, Vercel config, back cover synthesis, case study distillation.

**[Together] **Front cover final copy, bio draft, map composition, content panel layout, first deployment smoke test, all iteration passes.