export default function LoadingTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      {[1, 2, 3, 4, 5, 6, 7].map((row) => (

        <div
          key={row}
          className="flex border-b p-5"
        >

          {[1, 2, 3, 4, 5, 6].map((cell) => (

            <div
              key={cell}
              className="mr-6 h-5 flex-1 animate-pulse rounded bg-slate-200"
            />

          ))}

        </div>

      ))}

    </div>
  );
}