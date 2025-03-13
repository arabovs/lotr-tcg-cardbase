import { rulebooks } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function Rules() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Official Card Game Rules
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {rulebooks.map((book, index) => (
          <a
            key={index}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="p-4 shadow-md border rounded-2xl transition duration-300 hover:shadow-xl">
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <h3 className="text-lg font-semibold text-white-900">
                  {book.name}
                </h3>
                <p className="text-sm text-white-500">
                  Click to view or download
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}
