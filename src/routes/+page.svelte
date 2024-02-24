<script>
    let timer = 0;
    let deadline = 5;
    let score = 0;
    let isGameOver = false;
    let isRunning = false;
    let intervalId;
    let waitTimeIntervalId;
    let stage = 1;

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
            } else if (timer < deadline) {
                // デッドラインに達していない場合、タイマーを更新
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
            gameOver();
        } else {
            stop();
            score = deadline - timer;
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
        isGameOver = false;
        intervalId = null;
        isRunning = false;
    }
</script>

<section class="flex justify-center items-center bg-gray-100 my-10 p-5">
    <div class="text-4xl max-w-lg">
        <div>第{stage}ステージ</div>
        <div>スコア: {score.toFixed(2)}</div>
        <div>タイマー: {timer.toFixed(2)}</div>
        {#if !isGameOver}
            {#if !isRunning}
                <button on:click={startGame}>開始</button>
                {#if stage === 1}
                    <img
                        class="w-1/2"
                        alt="待機中の車"
                        src="https://4.bp.blogspot.com/-1vWMf13IxHU/Viiphwt5ZZI/AAAAAAAAz6s/Ta_uhcwxEbI/s800/topview_car.png"
                    />
                {:else}
                    <img
                        class="w-1/2"
                        alt="通過"
                        src="https://2.bp.blogspot.com/-YhE915jVRVM/VS0EnKvcb0I/AAAAAAAAtFM/-NVXLTirJdQ/s800/car_speeding.png"
                    />
                {/if}
            {:else}
                <button on:click={go}>ダッシュ！</button>
                <img
                    class="w-1/2"
                    alt="待機中の車"
                    src="https://4.bp.blogspot.com/-1vWMf13IxHU/Viiphwt5ZZI/AAAAAAAAz6s/Ta_uhcwxEbI/s800/topview_car.png"
                />
            {/if}
        {:else}
            <button on:click={startGame}>リトライ</button>
            <div>
                ゲームオーバー
                <img
                    class="w-1/2"
                    src="https://2.bp.blogspot.com/-fI_FUTkLzfU/WM9X4bUcULI/AAAAAAABCtw/nXaYWFa-KUA3yet-KlfrGPTiPD4BGndLgCLcB/s800/job_police_musen_serious_man.png"
                    alt="おまわりさん"
                />
            </div>
        {/if}
    </div>
</section>
