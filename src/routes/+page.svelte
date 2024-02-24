<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    let timer = 0;
    const initialDeadline = 1.3;
    let deadline = initialDeadline;
    let score = 0;
    let isGameOver = false;
    let isRunning = false;
    let intervalId;
    let waitTimeIntervalId;
    let stage = 1;
    let startSound;
    let trafficLight = "red";
    // 画像URLを変数に格納
    let waitingCarImage = "/image/waiting/car.png";
    let speedingCarImage = "/image/speeding/car.png";
    let policeManImage = "/image/police/man.png";
    let accidentImage;
    const accidentImages = [
        "/image/accident/deer.png",
        "/image/accident/old-woman.png",
    ];

    onMount(() => {
        startSound = new Audio("/sound/start.mp3");
        accidentImage = selectImage(accidentImages);
        console.log("accidentImage", accidentImage);
    });

    function selectImage(imageList: string[]) {
        const num = imageList.length % stage;
        return imageList[num];
    }

    function showAllLogs() {
        console.log(
            "isRunning:",
            isRunning,
            "isGameOver:",
            isGameOver,
            "timer:",
            timer,
            "score:",
            score,
        );
    }
    async function startGame() {
        showAllLogs();
        if (isRunning) return;
        if (isGameOver) {
            resetGame();
        } else {
            trafficLight = "red";
            if (stage === 1) {
                // startSound.play();
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (waitTimeIntervalId) {
                clearInterval(waitTimeIntervalId);
            }
            isRunning = true;
            timer = 0;
        }
        const waitTime = Math.random() * 1000 + 1000;
        // ゲーム開始前の待機時間を設定
        await new Promise(
            (resolve) => (waitTimeIntervalId = setTimeout(resolve, waitTime)),
        ); // ゲーム開始前の待機時間
        if (!isRunning) return;
        // タイマーを開始し、一定間隔で時間を更新
        intervalId = setInterval(() => {
            if (!isRunning) {
                console.log("isRunning", isRunning);
            } else if (timer <= deadline) {
                // デッドラインに達していない場合、タイマーを更新
                trafficLight = "blue";
                timer += 0.01;
            } else {
                // デッドラインに達した場合、タイマーを停止しゲームオーバー状態にする
                gameOver();
            }
        }, 10); // 10ミリ秒ごとにタイマーを更新
    }

    function go() {
        showAllLogs();
        if (timer === 0) {
            // 信号赤の状態で発信
            gameOver();
        } else {
            stop();
            score = deadline - timer;
            deadline = deadline - timer;
            console.log("score", score, "deadline", deadline);
            stage = stage + 1;
        }
    }
    function stop() {
        isRunning = false;
        // タイマーと待機時間のインターバルをクリア
        clearInterval(intervalId);
        clearInterval(waitTimeIntervalId);
        // intervalIdとwaitTimeIntervalIdをnullに設定して、参照をクリア
        intervalId = null;
        waitTimeIntervalId = null;
    }

    function gameOver() {
        isGameOver = true;
        isRunning = false;
        clearInterval(intervalId);
        clearInterval(waitTimeIntervalId);
    }

    function resetGame() {
        timer = 0;
        score = 0;
        stage = 1;
        deadline = initialDeadline;
        isGameOver = false;
        intervalId = null;
        isRunning = false;
    }
</script>

<section class="flex justify-center items-center bg-gray-100 p-5">
    <div class="max-w-lg text-center">
        <div class="p-5 bg-white rounded-lg shadow-lg mb-10">
            <div class="text-4xl">第{stage}ステージ</div>
            <!-- <div>デッドライン: {deadline.toFixed(2)}</div> -->
            <div class="text-2xl">スコア: {Number(score.toFixed(0)) * 10}</div>
            <!-- <div>タイマー: {timer.toFixed(2)}</div> -->
        </div>
        <div class="text-2xl">
            <img
                class="w-1/2 mx-auto text-center mb-5"
                alt="信号機"
                src={`/image/traffic-light/${trafficLight}.png`}
                transition:slide={{ duration: 500 }}
            />
            {#if !isGameOver}
                {#if !isRunning}
                    <button
                        class="bg-blue-500 text-white py-2 px-4 rounded"
                        on:click={startGame}>開始</button
                    >
                    {#if stage === 1}
                        <img
                            class="w-1/2 mx-auto text-center"
                            alt="待機中の車"
                            src={waitingCarImage}
                        />
                    {:else}
                        <img
                            class="mx-auto"
                            alt="茨城ダッシュ"
                            src={speedingCarImage}
                        />
                    {/if}
                {:else}
                    <button
                        class="bg-blue-500 text-white py-2 px-4 rounded"
                        on:click={go}>ダッシュ！</button
                    >
                    <img
                        class="w-1/2 mx-auto"
                        alt="待機"
                        src={waitingCarImage}
                    />
                {/if}
            {:else}
                <div class="text-6xl font-bold text-red-500">
                    ゲームオーバー
                    {#if trafficLight === "red"}
                        <!-- おまわりさんが出てくる -->
                        <img
                            class="w-1/3 mx-auto"
                            src={policeManImage}
                            alt="おまわりさん"
                        />
                    {:else}
                        <!-- 衝突事故 -->
                        <img
                            class="w-1/2 mx-auto"
                            src={accidentImage}
                            alt="衝突事故"
                        />
                    {/if}
                </div>
                <button
                    class="bg-blue-500 text-white py-2 px-4 rounded"
                    on:click={startGame}>リトライ</button
                >
            {/if}
        </div>
    </div>
</section>
<section class="flex justify-center items-center my-10 p-5">
    <div>
        <h2 class="text-2xl">クレジット</h2>
        <ul class="list-disc">
            <li class="list-inside">
                <a
                    href="https://soundeffect-lab.info/sound/machine/machine2.html"
                    >効果音ラボ</a
                >
            </li>
            <li class="list-inside">
                <a href="https://www.irasutoya.com/">イラスト屋</a>
            </li>
        </ul>
    </div>
</section>
