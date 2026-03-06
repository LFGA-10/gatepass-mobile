"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/Card";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const t = {
    English: {
        title: "Support students' Dedication",
        desc: "Would you like to support our students' dedication and problem solving skills? Every contribution helps us build better solutions.",
        amountLabel: "Contribution Amount (RWF)",
        amountPlaceholder: "e.g. 500",
        minAmountError: "The minimum contribution is 375 RWF.",
        supportBtn: "Contribute",
        skipBtn: "No, maybe next time",
        paymentTitle: "Complete Contribution",
        paymentDesc: (amount: number) => `You are contributing ${amount} RWF.`,
        momoLabel: "Mobile Money Number",
        momoPlaceholder: "e.g. 078XXXXXXX",
        processing: "Processing...",
        payBtn: (amount: number) => `Pay ${amount} RWF`,
        backBtn: "Back",
        successTitle: "Thank You!",
        successDesc: "Your generous contribution has been received.",
        doneBtn: "Return to Home",
    },
    Français: {
        title: "Soutenir le Dévouement des étudiants",
        desc: "Aimeriez-vous soutenir le dévouement et les compétences de résolution de problèmes des étudiants ? Chaque contribution nous aide à créer de meilleures solutions.",
        amountLabel: "Montant de la Contribution (RWF)",
        amountPlaceholder: "ex. 500",
        minAmountError: "La contribution minimale est de 375 RWF.",
        supportBtn: "Contribuer",
        skipBtn: "Non, peut-être la prochaine fois",
        paymentTitle: "Finaliser la Contribution",
        paymentDesc: (amount: number) => `Vous contribuez ${amount} RWF.`,
        momoLabel: "Numéro Mobile Money",
        momoPlaceholder: "ex. 078XXXXXXX",
        processing: "Traitement en cours...",
        payBtn: (amount: number) => `Payer ${amount} RWF`,
        backBtn: "Retour",
        successTitle: "Merci !",
        successDesc: "Votre généreuse contribution a été reçue.",
        doneBtn: "Retour à l'Accueil",
    },
    Kinyarwanda: {
        title: "Tera Inkunga Abanyeshuri",
        desc: "Ese wifuza gushyigikira ubwitange n'ubuhanga bwacu bwo gukemura ibibazo biri muri sosiyete? Buri nkunga idufasha kubaka ibisubizo byiza.",
        amountLabel: "Ingano y'Inkunga (RWF)",
        amountPlaceholder: "urugero: 500",
        minAmountError: "Inkunga ntoya ni 375 RWF.",
        supportBtn: "Tanga Inkunga",
        skipBtn: "Oya, wenda ubutaha",
        paymentTitle: "Soza Gutanga Inkunga",
        paymentDesc: (amount: number) => `Uri gutanga inkunga ya ${amount} RWF.`,
        momoLabel: "Numero ya Mobile Money",
        momoPlaceholder: "urugero: 078XXXXXXX",
        processing: "Birakozwe...",
        payBtn: (amount: number) => `Ishyura ${amount} RWF`,
        backBtn: "Sumbira inyuma",
        successTitle: "Murakoze!",
        successDesc: "Inkunga yanyu twakiriwe neza.",
        doneBtn: "Subira ahabanza",
    },
};

export default function SupportStudentPage() {
    const router = useRouter();
    const { lang } = useLanguage();
    const tr = t[lang] ?? t.English;

    const [step, setStep] = useState<"intro" | "payment" | "success">("intro");
    const [isProcessing, setIsProcessing] = useState(false);
    const [amount, setAmount] = useState<number>(385);
    const [phone, setPhone] = useState("");

    const handleSupportClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount >= 375) {
            setStep("payment");
        }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setStep("success");
    };

    const handleDone = () => {
        localStorage.clear();
        router.push("/");
    };

    const skipFlow = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-3 sm:p-4 md:p-8 py-14 sm:py-12 overflow-hidden">
            <AnimatePresence mode="wait">
                {step === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <Card className="border-border shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-primary" />
                            <CardHeader className="text-center pt-8 pb-4 space-y-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                                >
                                    <HeartHandshake size={32} />
                                </motion.div>
                                <CardTitle className="text-xl sm:text-2xl">{tr.title}</CardTitle>
                                <CardDescription className="text-base">{tr.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form id="amount-form" onSubmit={handleSupportClick} className="space-y-4">
                                    <Input
                                        type="number"
                                        label={tr.amountLabel}
                                        placeholder={tr.amountPlaceholder}
                                        value={amount || ""}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        min={375}
                                        required
                                    />
                                    {amount !== null && amount < 375 && (
                                        <p className="text-sm text-destructive font-medium">{tr.minAmountError}</p>
                                    )}
                                </form>
                            </CardContent>
                            <CardFooter className="flex-col space-y-3 pt-2">
                                <Button
                                    form="amount-form"
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={amount < 375}
                                >
                                    {tr.supportBtn}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={skipFlow}
                                >
                                    {tr.skipBtn}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <Card className="border-border shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl sm:text-2xl">{tr.paymentTitle}</CardTitle>
                                <CardDescription>{tr.paymentDesc(amount)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-center">
                                    <p className="text-sm font-medium text-foreground">
                                        {lang === "Français"
                                            ? "Veuillez appeler le code USSD ci-dessous pour finaliser votre contribution :"
                                            : lang === "Kinyarwanda"
                                                ? "Kanda iyi kode hasi kugirango usoze gutanga inkunga:"
                                                : "Please dial the USSD code below to complete your contribution:"
                                        }
                                    </p>
                                    <div className="bg-secondary/50 p-4 rounded-xl border border-primary/20">
                                        <p className="text-2xl font-bold tracking-wider text-primary break-all">
                                            *182*1*1*0780602022*{amount}#
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {lang === "Français"
                                            ? "Après avoir payé, cliquez sur le bouton ci-dessous."
                                            : lang === "Kinyarwanda"
                                                ? "Numara kwishyura kanda buto iri hasi."
                                                : "After paying, please click the button below."
                                        }
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-3">
                                <Button
                                    onClick={handlePaymentSubmit}
                                    className="w-full"
                                    size="lg"
                                    isLoading={isProcessing}
                                >
                                    {isProcessing ? tr.processing : (lang === "Français" ? "J'ai payé" : lang === "Kinyarwanda" ? "Nishyuye" : "I have paid")}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setStep("intro")}
                                    disabled={isProcessing}
                                >
                                    {tr.backBtn}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <Card className="border-border shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-primary" />
                            <CardHeader className="text-center pt-8 pb-4 space-y-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500"
                                >
                                    <CheckCircle2 size={32} />
                                </motion.div>
                                <CardTitle className="text-xl sm:text-2xl">{tr.successTitle}</CardTitle>
                                <CardDescription className="text-base">{tr.successDesc}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="rounded-lg bg-secondary/50 p-5 text-center text-sm leading-relaxed border border-border/50">
                                    <p className="font-medium text-foreground text-sm">
                                        {lang === "Français"
                                            ? "Cet argent ira aux étudiants de 4ward, un groupe qui a créé ce système qui aide l'école à coordonner facilement et avec succès les jours de visite."
                                            : lang === "Kinyarwanda"
                                                ? "Aya mafaranga azahabwa abanyeshuri ba 4ward, itsinda ryakoze ubu buryo bufasha ikigo guhuza neza kandi mu buryo bworoshye iminsi yo gusura."
                                                : "This money will be going to students 4ward a group that created this system that helps the school to easily and successfully coordinate Visit days."
                                        }
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col space-y-3 pt-2">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleDone}
                                >
                                    {tr.doneBtn}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
