import { useState } from "react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const currencies = [
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rate: 1 },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rate: 0.012 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rate: 0.011 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", rate: 0.0095 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", rate: 1.78 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rate: 0.018 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", rate: 0.016 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rate: 0.016 },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", rate: 0.41 },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", rate: 0.044 },
];

export function CurrencyConverterSection() {
  const [amount, setAmount] = useState("10000");
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const convertedAmount = (
    (parseFloat(amount) || 0) * (toCurrency.rate / fromCurrency.rate)
  ).toFixed(2);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Travel Smart
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Currency Converter
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Plan your budget with real-time exchange rates. Convert between 
              major world currencies for accurate trip planning.
            </p>
          </div>

          {/* Converter Card */}
          <div className="bg-card rounded-3xl shadow-elevated p-6 md:p-8 border border-border/50">
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              {/* From Currency */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">From</label>
                <div className="relative">
                  <button
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fromCurrency.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{fromCurrency.code}</p>
                        <p className="text-xs text-muted-foreground">{fromCurrency.name}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-elevated border border-border z-20 max-h-60 overflow-y-auto">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setFromCurrency(curr);
                            setShowFromDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                        >
                          <span className="text-xl">{curr.flag}</span>
                          <div className="text-left">
                            <p className="font-medium text-foreground">{curr.code}</p>
                            <p className="text-xs text-muted-foreground">{curr.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-secondary/30 border border-border text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="0"
                />
              </div>

              {/* Swap Button */}
              <Button
                variant="glass"
                size="icon"
                onClick={swapCurrencies}
                className="w-12 h-12 rounded-full self-end mb-6 mx-auto md:mx-0"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </Button>

              {/* To Currency */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">To</label>
                <div className="relative">
                  <button
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{toCurrency.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{toCurrency.code}</p>
                        <p className="text-xs text-muted-foreground">{toCurrency.name}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-elevated border border-border z-20 max-h-60 overflow-y-auto">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setToCurrency(curr);
                            setShowToDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                        >
                          <span className="text-xl">{curr.flag}</span>
                          <div className="text-left">
                            <p className="font-medium text-foreground">{curr.code}</p>
                            <p className="text-xs text-muted-foreground">{curr.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-full px-4 py-4 rounded-xl bg-primary/10 border border-primary/20 text-2xl font-bold text-primary">
                  {toCurrency.symbol} {convertedAmount}
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                1 {fromCurrency.code} = {(toCurrency.rate / fromCurrency.rate).toFixed(4)} {toCurrency.code}
              </p>
              <p className="text-xs text-muted-foreground">
                Rates updated • For planning purposes only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
