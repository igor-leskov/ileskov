import time

def loading_auto(duration, interval=0.1):
    start_time = time.time()
    end_time = start_time + duration
    while time.time() < end_time:
        progress = "=" * int((time.time() - start_time) / duration * 50)
        print(f"\rLoading: [{progress}] {int((time.time() - start_time) / duration * 100)}%", end="", flush=True)
        time.sleep(interval)
    print("\nLoading complete!")

loading_auto(5)
