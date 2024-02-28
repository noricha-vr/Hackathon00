<script lang="ts">
    import MetaTags from "$lib/components/MetaTags.svelte";
    import { onMount } from "svelte";
    const title = "バーチャルな茨城で茨城ダッシュ！";
    const description =
        "茨城を舞台にしたバーチャルなゲーム体験を提供するこのサイトでは、プレイヤーはバーチャルな茨城で茨城ダッシュを楽しむことができます。信号の色に応じてタイミング良くダッシュボタンを押し、スコアを稼ぎながらステージを進めていくことが目的です。赤信号でダッシュボタンを押すとゲームオーバーになるため、注意が必要です。最高スコアを目指して、茨城ダッシュのスリルを楽しもう！";
    const thumbnail = "/image/ogp.png";
    let timer = 0;
    const initialDeadline = 1.3;
    let deadline = initialDeadline;
    let score = 0;
    let maxScore = 0;
    let isGameOver = false;
    let isRunning = false;
    let intervalId;
    let waitTimeIntervalId;
    let stage = 1;
    let trafficLight = "red";
    // 画像URLを変数に格納
    let idlingCarImage = `/image/idling/red.gif`;
    let speedingCarImage = "/image/speeding/car.png";
    const accidentImages = ["/image/accident/deer.png"];
    const carAccidentSounds = ["/sound/accident/deer.mp3"];
    const policeImages = ["/image/police/man.png", "/image/police/car.png"];
    const policeSounds = ["/sound/police/man.mp3", "/sound/police/car.mp3"];
    let policeImage = policeImages[0];
    let accidentImage = accidentImages[0];
    let soundManager: SoundManager;

    class SoundManager {
        player: HTMLAudioElement;
        idlingCar = new Audio("/sound/idling/car.mp3");
        police = new Audio(selectOne(policeSounds));
        carAccident = new Audio(selectOne(carAccidentSounds));
        speedingCar = new Audio("/sound/speeding/car.mp3");

        update() {
            this.police = new Audio(selectOne(policeSounds));
            this.carAccident = new Audio(selectOne(carAccidentSounds));
            console.log(
                `stage: ${stage}, police: ${this.police.src}, carAccident: ${this.carAccident.src}`,
            );
        }
        play(soundName: keyof SoundManager) {
            if (this.player && !this.player.paused) {
                this.player.pause();
                this.player.currentTime = 0;
            }
            this.player = this[soundName] as HTMLAudioElement;
            if (this.player instanceof Audio) {
                this.player.play();
            }
        }
    }

    onMount(() => {
        soundManager = new SoundManager();
        // localStorageから最高スコアを読み込む
        const storedMaxScore = localStorage.getItem("maxScore");
        console.log("storedMaxScore", storedMaxScore);
        if (storedMaxScore) {
            maxScore = Number(storedMaxScore);
        }
    });
    $: if (stage > 1) {
        policeImage = selectOne(policeImages);
        accidentImage = selectOne(accidentImages);
        soundManager.update();
    }

    $: if (trafficLight === "red") {
        idlingCarImage = "/image/idling/red.gif";
    } else {
        idlingCarImage = "/image/idling/blue.gif";
    }

    function selectOne(someList: string[]) {
        const num = (stage - 1) % someList.length;
        return someList[num];
    }

    async function startGame() {
        if (isRunning) return;
        if (isGameOver) {
            resetGame();
        } else {
            trafficLight = "red";
            soundManager.play("idlingCar");
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (waitTimeIntervalId) {
                clearInterval(waitTimeIntervalId);
            }
            isRunning = true;
            timer = 0;
        }
        const waitTime = Math.random() * 2000 + 1000;
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
                soundManager.play("carAccident");
                gameOver();
            }
        }, 10); // 10ミリ秒ごとにタイマーを更新
    }

    function go() {
        if (timer === 0) {
            // 信号赤の状態で発信
            gameOver();
            soundManager.play("police");
        } else {
            stop();
            soundManager.play("speedingCar");
            score = (deadline - timer) * stage * 100 + score;
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
        // 現在のスコアが最高スコアより高ければ更新
        if (score > maxScore) {
            maxScore = score;
            // 更新した最高スコアをlocalStorageに保存
            localStorage.setItem("maxScore", maxScore.toString());
        }
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

<MetaTags {title} {description} {thumbnail}></MetaTags>

<section class="flex justify-center items-center bg-gray-100 p-5">
    <div class="max-w-lg text-center">
        <div class="mt-5 p-2 pb-5 bg-blue-100 rounded-lg shadow-md mb-6">
            <div class="text-xl mb-3 mt-3 font-bold">遊び方</div>
            <ul class="list-inside space-y-2">
                <li>
                    <span class="font-bold">「開始」</span> ボタンでゲームスタート！
                </li>
                <li>
                    <span class="text-blue-500 font-bold">青信号</span> の時にダッシュボタンを押してスコアを稼ごう！
                </li>
                <li>
                    <span class="text-red-500 font-bold">赤信号</span> の時にダッシュボタンを押すとゲームオーバー！
                </li>
                <li>ステージが上がると難易度が上がって、スコアも高くなるよ</li>
            </ul>
        </div>

        <div class="p-5 bg-white rounded-lg shadow-lg mt-5 mb-10">
            <div class="text-left mb-3 p-3">
                <div
                    class="inline-block bg-white text-black font-bold text-lg border-4 border-gray-400 p-4 rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
                >
                    <div class="mb-1">
                        最高スコア: <span class="text-green-600"
                            >{Number(maxScore.toFixed(0)) * 10}</span
                        >
                    </div>
                    <div class="mb-1">
                        スコア: <span class="text-blue-600"
                            >{Number(score.toFixed(0)) * 10}</span
                        >
                    </div>
                    <div class="mb-1">
                        タイマー: <span class="text-red-600"
                            >{timer.toFixed(2)}</span
                        >
                    </div>
                </div>
            </div>
            <div class="text-4xl mb-3">第{stage}ステージ</div>
            <!-- <div>デッドライン: {deadline.toFixed(2)}</div> -->

            <div class="text-2xl">
                <img
                    class="w-1/2 mx-auto text-center mb-5"
                    alt="信号機"
                    src={`/image/traffic-light/${trafficLight}.png`}
                />
                {#if !isGameOver}
                    {#if !isRunning}
                        <button
                            class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-xl"
                            on:click={startGame}>開始</button
                        >
                        {#if stage === 1}
                            <img
                                class="w-2/3 mx-auto text-center mt-5"
                                alt="待機中の車"
                                src={idlingCarImage}
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
                            class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-xl"
                            on:click={go}>ダッシュ！</button
                        >
                        <img
                            class="w-2/3 mx-auto mt-5"
                            alt="待機"
                            src={idlingCarImage}
                        />
                    {/if}
                {:else}
                    <div class="text-6xl font-bold text-red-500">
                        ゲームオーバー
                        {#if trafficLight === "red"}
                            <!-- おまわりさんが出てくる -->
                            <img
                                class="w-1/3 mx-auto"
                                src={policeImage}
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
                        class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-xl"
                        on:click={startGame}>リトライ</button
                    >
                {/if}
            </div>
        </div>
    </div>
</section>
