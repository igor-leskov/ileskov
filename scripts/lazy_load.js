import time

def loading_lazy(duration, interval=0.1):
    start_time = time.time()
    while time.time() - start_time < duration:
        progress = "=" * min(int((time.time() - start_time) / duration * 50), 50)
        print(f"\rLoading: [{progress.ljust(50)}] {int((time.time() - start_time) / duration * 100)}%", end="", flush=True)
        time.sleep(interval)
    print("\nLoading complete!")

loading_lazy(5)  
