import time

def loading_eager(duration, interval=0.1):
    total_ticks = int(duration / interval)
    for tick in range(total_ticks):
        progress = "=" * tick + ">" + " " * (total_ticks - tick - 1)
        percentage = (tick + 1) / total_ticks * 100
        print(f"\rLoading: [{progress}] {int(percentage)}%", end="", flush=True)
        time.sleep(interval)

loading_eager(5)
