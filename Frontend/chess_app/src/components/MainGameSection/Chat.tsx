export default function Chat() {
  return (
    <div className="w-full p-2 flex gap-2 min-h-10">
        <div className="w-full flex gap-2">
            <div className="h-1/2">
                <img src="/avatar-icon.svg" className="h-5 w-5 object-contain bg-white rounded-full"/>
            </div>
            <div className="w-full rounded-b-sm border border-amber-50 gap-1">
                <div className="flex gap-2">
                    <span>Name</span>
                    <span>4:15 PM</span>
                </div>
                <div>
                  <p>Hi Good Game!</p>
                </div>
            </div>
        </div>
    </div>
  );
}   