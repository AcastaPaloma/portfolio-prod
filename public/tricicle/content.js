// Every passage of the write-up and what the left panel shows while you read it.
const SA = '<span class="pol sa">SA</span>', DA = '<span class="pol da">DA</span>', BIC = '<span class="pol bic">BiCICLe</span>';

export const PASSAGES = [
  {
    id: 'intro', chapter: 'Start', title: 'Three arms, one language model',
    stage: {type: 'video', name: 'gallery', caption: 'The 13 tasks, rebuilt for three robot arms. Each tile is a successful episode.'},
    body: `<p class="byline">Kuan Yi Wang · November 2026 · <a href="tricicle-report.pdf">PDF version</a></p>
<p class="lede">A 2026 paper, <a href="https://arxiv.org/abs/2604.20348">BiCICLe</a>, controls two robot arms with a large
language model (LLM). I rebuilt it for three arms and got the opposite answer. This is the story of figuring out why.</p>
<p>No robotics or machine-learning background needed: if you've written a for-loop, you're fine. The left panel follows
along as you scroll. The <a href="results.html">Results</a> tab has every number, and <a href="videos.html">Videos</a> has
every clip.</p>
<div class="takeaway"><b>The short version.</b> The paper says the best way to split work between arms is a
<em>chain</em>: one LLM plans the first arm, the next LLM sees that plan and plans the next arm. With three arms, I found one
LLM planning everything at once did best. About half of that difference came from a quirk in my example videos. The other
half really is the model: the paper's small model needs the chain, and a strong model doesn't.</div>`,
  },
  {
    id: 'idea', chapter: 'The idea', major: true, title: 'Teaching a robot with examples in a prompt',
    stage: {type: 'prompt'},
    body: `<p>The usual way to teach a robot a task is to collect thousands of examples and <em>train</em> a neural network on
them. That takes days of computing for every new task.</p>
<p>BiCICLe skips training. It takes an LLM that already exists, the same kind of model behind chatbots, and puts about ten
solved examples of the task <em>inside the prompt</em>. Then it shows a new scene and asks the model to continue the pattern.
This is called <b>in-context learning</b>: like learning a card trick by watching it ten times, without anyone explaining the
rules.</p>
<p>On the left is a real prompt for pushing a box. The model never gets told what the task is. It only sees the pattern.</p>`,
  },
  {
    id: 'tokens', title: 'Robot motion, written as numbers',
    stage: {type: 'tokens'},
    body: `<p>An LLM reads and writes text, so every motion is squeezed into whole numbers:</p>
<ul><li><b>Where.</b> The workspace is cut into a 100 × 100 × 100 grid of small boxes, about 1 cm each, so a position is
three numbers from 0 to 99.</li>
<li><b>How the hand is turned.</b> Each of three angles is rounded to the nearest 5° and written as a number from 0 to 71.</li>
<li><b>The gripper.</b> 1 is open, 0 is closed.</li></ul>
<p>That's 7 numbers per arm for each <b>keyframe</b>, a pose the hand should move to. The robot's own motion planner moves
smoothly from one keyframe to the next.</p>
<p>Click any number on the left to decode it. The two arms slide along the second number, 10 to 66, at the same moments:
they push the box together.</p>`,
  },
  {
    id: 'policies', title: 'Three ways to split the work',
    stage: {type: 'policies', mode: 'sa'},
    body: `<p>With more than one arm, someone has to decide who plans what. The paper compares three answers (switch between
them above the diagram):</p>
<ul><li>${SA}, the <em>single agent</em>: one LLM call writes every arm's moves at once, one long line of numbers. One
pianist playing with both hands.</li>
<li>${DA}, <em>decentralised agents</em>: each arm gets its own LLM call, which only sees that arm's past moves. Two pianists
in separate soundproof rooms, each playing their part from memory.</li>
<li>${BIC}, the paper's method: a chain. The <em>leader</em> arm is planned first; the next arm's call is shown the
leader's plan, and so on. A duet where the second player listens to the first.</li></ul>`,
  },
  {
    id: 'paper', title: 'What the paper found',
    stage: {type: 'chart', id: 'paper', caption: 'The paper\'s numbers: average success over its 13 two-arm tasks. Hover a bar for the exact value.'},
    body: `<p>The paper tests on <b>TWIN</b>, 13 two-arm tasks in a robot simulator called RLBench: pushing a box, handing an
item from one gripper to the other, lifting a tray, sweeping dirt into a dustpan, and so on.</p>
<p>With both of its models, the chain wins. For Qwen 2.5 7B, a small open model, ${BIC} succeeds 55.6% of the time against
51.9% for ${SA} and 50.9% for ${DA}. With GPT-5-mini the gap is bigger: 70.5% against 60.6% and 64.4%.</p>`,
  },
  {
    id: 'built', chapter: 'What I built', major: true, title: 'TRICICLE: the same idea, three arms',
    stage: {type: 'video', name: 'gallery', caption: 'All 13 tasks in my simulator, three Franka Panda arms each.'},
    body: `<p>I built a physics simulation of three Franka Panda robot arms around a table, in the MuJoCo simulator, and
rebuilt all 13 TWIN tasks so that they need all three arms: a box pushed by three hands, three buttons pressed within 0.3
seconds of each other, a tray lifted level by three grippers.</p>
<p>Everything else follows the paper: the same number format, about ten examples per prompt, the robot replans when a plan runs
out, and at most 25 steps per attempt.</p>`,
  },
  {
    id: 'opposite', title: 'The opposite answer',
    stage: {type: 'video', name: 'methods_lift_tray', caption: '<strong>Same scene, three policies</strong> (lift tray, Claude Sonnet 5.5). The independent arms lift at different moments and the tray tips.'},
    body: `<p>With Claude Sonnet 5.5, over 260 test scenes, one agent for all arms (${SA}) succeeded <b>85.4%</b> of the time,
the chain (${BIC}) <b>83.5%</b>, and independent agents (${DA}) only <b>58.5%</b>.</p>
<p>So the single agent won, and independent agents fell apart. Both are the opposite of the paper. The obvious suspect:
Sonnet is a much stronger model than the paper's, and maybe strong models just don't need help. The rest of this page tests
that.</p>`,
  },
  {
    id: 'scoring', title: 'How I keep score',
    stage: {type: 'dots', a: ['twin', 'sonnet', 'sa'], b: ['twin', 'sonnet', 'da'], labelA: 'SA', labelB: 'DA',
      caption: 'Every dot is one scene: 13 tasks × 20 scenes, Sonnet on TWIN-3. Hover a dot to see which.'},
    body: `<p>Each task has 20 test <em>scenes</em>, random starting layouts: 260 over the 13 tasks. Every policy and every
model gets exactly the same 260, so differences come from the policy, not from lucky layouts.</p>
<p>The <b>success rate</b> is the share of scenes where the simulator's built-in check passes (for the tray: lifted more than
8 cm while level, never tilted past 15°, and the cup on it still upright).</p>
<p>To compare two policies, look only at the scenes where exactly <em>one</em> of them succeeded. If they were equally good,
each of those would be a coin flip. The <b><i>p</i>-value</b> is how often fair coins would give a split at least as lopsided
as the one we see. Below about 5%, the difference is probably real. (This is McNemar's test.)</p>`,
  },
  {
    id: 'worlds', title: 'Four test worlds, one change at a time',
    stage: {type: 'worlds'},
    body: `<p>To find out why my answer differs from the paper's, I ended up with four test worlds. Each one changes a single
thing, so if the results move, I know what moved them.</p>
<p>The first is the most important: before blaming the model, I had to make sure I could reproduce the paper at all.</p>`,
  },
  {
    id: 'replica', chapter: 'Checking against the paper', major: true, title: 'Did I rebuild the paper correctly?',
    stage: {type: 'chart', id: 'replica', highlight: 1, sweepToggle: true,
      caption: 'The paper\'s own two-arm test, rebuilt. Compare the first two groups: the paper\'s Qwen and mine.'},
    body: `<p>I reinstalled the paper's simulator and its two-arm tasks on a rented GPU and copied every detail the paper
gives: six cameras, the 100³ grid, the 5° angle steps, ten examples per prompt, 25 steps, the exact prompts. Then I ran the
paper's own model, Qwen 2.5 7B.</p>
<p>Two checks. First, the robot's “eyes”: object positions are worked out from the cameras, and mine are off by the same
amounts as the paper's (4.2 vs 4.6 cm for the box, 5.8 vs 6.1 cm for the ball). Second, the scores: leaving out one broken
task (next passage), my Qwen is within about a point of the paper's on ${SA} and ${BIC} (47.5 vs 48.6, 52.9 vs 51.9), and the
chain beats the single agent in both. Toggle <em>Without sweeping</em> above the chart to see it.</p>
<div class="takeaway">The rebuild is faithful: the paper's model gets the paper's numbers.</div>`,
  },
  {
    id: 'sweep', title: 'The one task that won\'t replicate',
    stage: {type: 'heat', highlightTask: 'sweep_dustpan', runs: [['rlbench', 'paper-qwen2.5-7b', 'Qwen 2.5 7B, paper'], ['rlbench', 'qwen2.5-7b', 'Qwen 2.5 7B, mine']],
      caption: 'Success per task (%), the paper\'s Qwen next to mine. Bold marks the best policy in each row. Hover a cell for the count.'},
    body: `<p>The paper's Qwen sweeps dirt into the dustpan 91–99% of the time. Mine: 0%. The culprit is the 1 cm grid, not
the model.</p>
<p>When I take the <em>perfect</em> demonstrations and round them to the grid, the broom is gripped 2 mm too low and sweeps
3 mm too high, gliding over the dirt. Replayed without rounding, perfect demos succeed 4 times out of 4; rounded, 0 out of 4.
Shift the whole grid up by 5 mm and sweeping works (60 out of 60 for Qwen), but then picking up the plate breaks.</p>
<p>Whether a task is solvable at all depends on where the grid lines happen to fall, and a slightly different install of the
simulator can move them. I kept the paper's stated grid and report averages with and without this task.</p>`,
  },
  {
    id: 'strong', title: 'A stronger model on the paper\'s own test',
    stage: {type: 'chart', id: 'replica', highlight: 3, caption: 'Same chart, now look at the last group: Claude Sonnet 5.5 on the paper\'s own test.'},
    body: `<p>Now the real question: is it just the model? On the paper's own test, Claude Sonnet 5.5 prefers the single agent:
<b>67.7%</b> for ${SA} against <b>61.5%</b> for ${BIC}. Out of the scenes where exactly one of them succeeded, the single agent
won 39 and the chain 23 (<i>p</i> = 0.056, borderline). It also needs about half the LLM calls: 2.1 per attempt against
4.6.</p>
<p>The paper's best model, GPT-5-mini, needs an OpenAI account I didn't have. Its free sibling <code>gpt-oss-120b</code> lands
at Qwen's level, not GPT-5-mini's, so that row stays unchecked.</p>
<div class="takeaway">A strong model doesn't need the chain, even on the paper's own test.</div>`,
  },
  {
    id: 'three-arm', chapter: 'Finding the culprit', major: true, title: 'Three arms, four models',
    stage: {type: 'chart', id: 'twin_models', caption: 'My three-arm suite (TWIN-3), four models, the same 260 scenes each.'},
    body: `<p>Next I ran four models on my three-arm world. Two things stand out:</p>
<ul><li><b>Independent agents collapse for every model</b>, 14–27 points below the single agent. In the paper, ${DA} is about
as good as ${SA}.</li>
<li><b>The single agent wins for every model, even the paper's own.</b> Qwen 2.5 7B, which preferred the chain on the paper's
test, now prefers one agent: 60.0% against 53.1%.</li></ul>
<p>If even the paper's model behaves differently here, it's not only the model. Something about my world is different.</p>`,
  },
  {
    id: 'pauses', title: 'Random pauses in the demos',
    stage: {type: 'timeline', mode: 'pauses'},
    body: `<p>The paper's demonstrations are very regular. “Press two buttons” always takes exactly 4 keyframes and “lift
tray” always 5, so both arms reach each stage at the same keyframe number in every example.</p>
<p>My three-arm demos come from a script that sometimes hovers in mid-air before grabbing, to make the examples more varied.
So arm A might grab the tray at keyframe 2 in one example and keyframe 4 in the next.</p>
<p>That's poison for independent agents. Each one only sees its <em>own</em> arm's past moves. To know when to lift, it has to
guess when the other arms will be ready, and with random pauses every arm guesses differently. Switch to <em>Without
pauses</em> above the illustration to compare.</p>`,
  },
  {
    id: 'remove', title: 'Take the pauses out…',
    stage: {type: 'video', name: 'jitter_tray', caption: '<strong>Independent agents, same scene.</strong> Left: demos with random pauses, the tray tips. Right: demos without pauses, success.'},
    body: `<p>So I built a fourth world, <b>no pauses</b>: exactly the same 260 scenes, tasks and success checks, with demos that
never pause. Nothing else changes.</p>
<p>On the left, the same scene with independent agents, before and after. Only the examples in the prompt changed.</p>`,
  },
  {
    id: 'ranking', title: '…and the paper\'s ranking comes back',
    stage: {type: 'chart', id: 'pauses', caption: 'Each model with and without random pauses in its demos, on the same 260 scenes.'},
    body: `<ul><li><b>Sonnet's independent agents</b> jump from 58.5% to <b>86.2%</b>, and the other two policies barely move.
The collapse was entirely the pauses. (<i>p</i> below 1 in 10¹³.)</li>
<li><b>The paper's model is back to the paper's ranking.</b> Qwen 2.5 7B now scores 70.4% with the chain, 66.2% with one
agent and 63.8% independently. The chain beats the single agent by 4.2 points; in the paper it was 3.7. On its own
that gap could still be luck (<i>p</i> = 0.20), but it points the same way as the paper, by about the same amount.</li>
<li><b>Sonnet doesn't care any more.</b> All three policies land within 1.5 points: 86.9, 86.2 and 85.4%.</li></ul>
<div class="takeaway">Half of the difference from the paper was my demos. What's left is the model.</div>`,
  },
  {
    id: 'small', chapter: 'The model\'s part', major: true, title: 'Why a small model needs the chain',
    stage: {type: 'video', name: 'weak_model_ball', caption: '<strong>Qwen 2.5 7B, lift ball, no pauses.</strong> One agent and independent agents drop the ball; the chain lifts it.'},
    body: `<p>With one agent, the model has to write 3 × 7 = 21 numbers per keyframe that all fit together: three hands meeting
the same ball at the same moment, from three different sides. For a small model, that's a lot to get right in one go.</p>
<p>The chain breaks it into easier pieces: 7 numbers for arm A, then 7 for arm B while looking at A's plan, then C. On the
left, the paper's model drops the ball with ${SA} and with ${DA}, and lifts it with ${BIC}.</p>`,
  },
  {
    id: 'big', title: 'Why a strong one doesn\'t',
    stage: {type: 'video', name: 'strong_vs_weak', caption: '<strong>Same scene, same policy (one agent), two models.</strong> Left: Claude Sonnet 5.5. Right: Qwen 2.5 7B.'},
    body: `<p>Sonnet already keeps 21 numbers consistent within one line: equal lift heights, simultaneous presses. For it,
splitting the job only adds overhead: three times the LLM calls, plus the chance that each arm's agent reads the scene
slightly differently.</p>
<p>On the left, the same scene and the same single-agent policy with both models.</p>`,
  },
  {
    id: 'triplet', chapter: 'Realism', major: true, title: 'Making it messier: TRIPLET',
    stage: {type: 'video', name: 'triplet_plate', caption: '<strong>Pick up plate, Sonnet.</strong> Chain with exact positions; chain with cameras and noise (the plate tips); one agent with cameras and noise.'},
    body: `<p>My three-arm world tells the model exactly where every object is, and the arms move exactly where they're told.
Real robots get neither. <b>TRIPLET</b> adds the main sources of real-world mess:</p>
<ul><li><b>Cameras instead of exact positions.</b> Eight simulated depth cameras; each object's position is estimated from its
pixels, with sensor noise, missing pixels and calibration error. The same method as the paper.</li>
<li><b>Random physics.</b> Masses and friction scaled by 0.8–1.25, joint damping by 0.7–1.4, new every attempt.</li>
<li><b>Imperfect arms.</b> A fixed calibration offset per arm (typically 4 mm sideways, 2 mm vertically) and about 1.5 mm of
random error on every move.</li></ul>
<p>Realism costs every policy, but the chain twice as much: <b>−23.1</b> points against <b>−11.5</b> for the single agent.
My guess, not yet tested: one agent reads one noisy view and writes all arms from it, so the arms at least agree with each
other. In the chain, each arm's agent reads the noise separately and adds its own small errors on top of the leader's.</p>`,
  },
  {
    id: 'wrap', chapter: 'Wrap-up', major: true, title: 'What I take away',
    stage: {type: 'summary'},
    body: `<ol><li><b>My copy of the paper's test is faithful.</b> With the paper's model I get the paper's numbers and ranking,
apart from one task broken by grid rounding.</li>
<li><b>The difference from the paper had two causes.</b> My demos paused at random, which wrecked independent agents for every
model. And the model really matters for single agent vs chain: a small model benefits from splitting the job, a strong one
doesn't.</li>
<li><b>With a strong model, simplest is best.</b> One agent writing all the arms matches or beats the chain, with half the
calls, and holds up better when perception is noisy.</li></ol>
<p><b>What I couldn't check:</b> GPT-5-mini itself (no OpenAI account); a TRIPLET without pauses, which would show how much of
the chain's loss is perception alone; and videos of the paper's own test, whose simulator lived on a rented GPU that's now
shut down.</p>
<p>Every number is on the <a href="results.html">Results</a> tab, where you can also compare any two policies scene by scene.
The <a href="tricicle-report.pdf">PDF version</a> has the same story with paper-style tables.</p>`,
  },
];
