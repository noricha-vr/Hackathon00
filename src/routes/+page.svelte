<script>
    let timer = 0;
    let deadline = 5; // 5秒後にデッドライン
    let isGameOver = false;
    let score = 0;
    let intervalId;
    let waitTimeIntervalId;
    let isRunning = false;
    function startGame() {
        if (isRunning) return;
        if (isGameOver) {
            resetGame();
        } else {
            isRunning = true;
            timer = 0;
        }
        const waitTime = Math.random() * 1000 + 1000;
        // ゲーム開始前の待機時間を設定
        waitTimeIntervalId = setTimeout(() => {
            if (!isRunning) return;
            // タイマーを開始し、一定間隔で時間を更新
            intervalId = setInterval(() => {
                if (timer < deadline) {
                    // デッドラインに達していない場合、タイマーを更新
                    timer += 0.01;
                } else {
                    // デッドラインに達した場合、タイマーを停止しゲームオーバー状態にする
                    gameOver();
                }
            }, 10); // 10ミリ秒ごとにタイマーを更新
        }, waitTime); // ゲーム開始前の待機時間
    }

    function go() {
        console.log(
            "isRunning:",
            isRunning,
            "isGameOver:",
            isGameOver,
            "timer:",
            timer,
        );
        if (!isRunning) {
            return;
        } else if (timer === 0) {
            gameOver();
        } else {
            stop();
            score = deadline - timer;
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
        isGameOver = false;
        intervalId = null;
        isRunning = false;
    }
</script>

<section class="flex justify-center items-center bg-gray-100 my-10 p-5">
    <div class="text-4xl">
        <div>スコア: {score.toFixed(2)}</div>
        <div>タイマー: {timer.toFixed(2)}</div>
        {#if !isGameOver}
            {#if !isRunning}
                <button on:click={startGame}>ゲーム開始</button>
            {:else}
                <button on:click={go}>ダッシュ！</button>
            {/if}
        {:else}
            <button on:click={startGame}>リトライ</button>
            <div>ゲームオーバー</div>
        {/if}
    </div>
</section>
