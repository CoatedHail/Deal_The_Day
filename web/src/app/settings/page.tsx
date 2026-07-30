"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ChoiceGroup, Checkbox, TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { SpeechControls } from "@/components/a11y/SpeechControls";
import { useSettings } from "@/components/providers/SettingsProvider";
import { useData } from "@/components/providers/DataProvider";
import type {
  ContrastPreference,
  FontChoice,
  MotionPreference,
  TextSize,
  ThemePreference,
} from "@/lib/settings";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { data, storage, storageError, exportJson, clearAllData } = useData();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteState, setDeleteState] = useState<"idle" | "working" | "failed">("idle");

  const inAccount = storage === "account";

  async function deleteAccount() {
    setDeleteState("working");
    try {
      const response = await fetch("/api/account", { method: "DELETE" });
      if (!response.ok) throw new Error("delete failed");
      // A full page load rather than a client navigation: the session is gone,
      // and everything held in memory should go with it.
      window.location.href = "/";
    } catch {
      setDeleteState("failed");
    }
  }

  const entryCount =
    data.activities.length + data.checkIns.length + data.sessions.length;

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `deal-the-day-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-palette">
      <PageHeader
        title="Settings"
        description="How the site looks and reads, and what happens to what you have written."
      />

      <div className="space-y-6">
        <Card as="section">
          <CardHeader title="About you" />
          <TextField
            label="What should we call you?"
            help="Used only in greetings. It stays on this device."
            value={settings.displayName}
            onChange={(displayName) => updateSettings({ displayName })}
            placeholder="Optional"
          />
        </Card>

        <Card as="section">
          <CardHeader
            title="Reading and display"
            description="Change anything here at any time. Nothing is locked in."
          />
          <div className="space-y-6">
            <ChoiceGroup<ThemePreference>
              legend="Theme"
              options={[
                { value: "system", label: "Match my device" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={settings.theme}
              onChange={(theme) => updateSettings({ theme })}
              columns={3}
            />

            <ChoiceGroup<TextSize>
              legend="Text size"
              options={[
                { value: "sm", label: "Small" },
                { value: "md", label: "Default" },
                { value: "lg", label: "Large" },
                { value: "xl", label: "Largest" },
              ]}
              value={settings.textSize}
              onChange={(textSize) => updateSettings({ textSize })}
              columns={2}
            />

            <ChoiceGroup<FontChoice>
              legend="Typeface"
              help="The dyslexia-friendly option widens letter, word and line spacing, which is the part with the strongest evidence behind it. It also switches to a dyslexia-oriented font if one is installed on your device."
              options={[
                {
                  value: "default",
                  label: "Default",
                  description: "Atkinson Hyperlegible, designed for maximum legibility.",
                },
                {
                  value: "dyslexic",
                  label: "Dyslexia-friendly",
                  description: "Wider spacing and a more open, looser line height.",
                },
              ]}
              value={settings.font}
              onChange={(font) => updateSettings({ font })}
              columns={2}
            />

            <ChoiceGroup<ContrastPreference>
              legend="Contrast"
              options={[
                { value: "normal", label: "Default" },
                { value: "high", label: "Higher contrast" },
              ]}
              value={settings.contrast}
              onChange={(contrast) => updateSettings({ contrast })}
              columns={2}
            />

            <ChoiceGroup<MotionPreference>
              legend="Motion"
              help="Your device setting is respected automatically. This forces it off regardless."
              options={[
                { value: "system", label: "Match my device" },
                { value: "reduced", label: "Reduce motion" },
              ]}
              value={settings.motion}
              onChange={(motion) => updateSettings({ motion })}
              columns={2}
            />
          </div>
        </Card>

        <Card as="section">
          <CardHeader
            title="Reading aloud"
            description="A “Listen to this page” control on the explainers, the parent guide, the resources and the policies."
          />
          <div className="space-y-6">
            <Checkbox
              label="Offer to read pages aloud"
              description="For anyone who finds reading hard work rather than impossible — tiredness, dyslexia, a head too busy to hold a paragraph. If you use a screen reader, yours is better than this and you can turn this off."
              checked={settings.readAloud}
              onChange={(readAloud) => updateSettings({ readAloud })}
            />

            {settings.readAloud ? <SpeechControls /> : null}

            <Callout tone="info">
              Only the written pages can be read aloud, never anything you have
              written yourself. Some browsers speak by sending the text to their
              own servers, which is fine for a public explainer and would not be
              for your journal.
            </Callout>
          </div>
        </Card>

        <Card as="section">
          <CardHeader title="How progress is shown" />
          <Checkbox
            label="Gentle mode"
            description="Hides streaks, counts and milestones. Worth turning on if tracking starts to feel like another rule you have to obey — that happens, and it is a good reason to switch it off, not a failure."
            checked={settings.gentleMode}
            onChange={(gentleMode) => updateSettings({ gentleMode })}
          />
        </Card>

        <Card as="section">
          <CardHeader
            title="Your data"
            description={`${entryCount} ${entryCount === 1 ? "entry" : "entries"} ${
              inAccount ? "saved to your account." : "stored on this device."
            }`}
          />

          {storageError ? (
            <Callout tone="caution" title="Not saving right now" className="mb-5">
              {storageError}
            </Callout>
          ) : null}

          {inAccount ? (
            <Callout tone="info" className="mb-5">
              Everything you write is saved to your account, so it follows you between
              devices and survives clearing your browser. Only you can read it. An
              export is still worth keeping if it matters to you.
            </Callout>
          ) : (
            <Callout tone="info" className="mb-5">
              Everything you write stays in this browser. It is not uploaded anywhere.
              That also means clearing your browser data, or switching device, will
              lose it — sign in to keep it with your account, or export a copy.
            </Callout>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={download}>
              <Icon name="download" size={18} />
              Export a copy
            </Button>

            {confirmingClear ? (
              <>
                <Button
                  variant="danger"
                  onClick={() => {
                    clearAllData();
                    setConfirmingClear(false);
                  }}
                >
                  Yes, delete everything
                </Button>
                <Button variant="quiet" onClick={() => setConfirmingClear(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="danger" onClick={() => setConfirmingClear(true)}>
                Delete all my data
              </Button>
            )}
          </div>

          {confirmingClear ? (
            <p className="mt-3 text-sm text-accent">
              This removes every activity, check-in and note{" "}
              {inAccount ? "from your account" : "from this device"}. It cannot be
              undone.
            </p>
          ) : null}
        </Card>

        {inAccount ? (
          <Card as="section">
            <CardHeader
              title="Your account"
              description="Signed in with Google. Deleting the account is separate from clearing your entries above."
            />

            <p className="mb-5 text-text-muted">
              Deleting removes your account and everything in it from our database —
              your name and email as well as your entries. It is not hidden or marked
              inactive, and it cannot be recovered afterwards, so export a copy first
              if you might want one.
            </p>

            {deleteState === "failed" ? (
              <Callout tone="caution" title="That did not work" className="mb-5">
                Your account has not been deleted. It may just be the connection —
                try again in a moment.
              </Callout>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {confirmingDelete ? (
                <>
                  <Button
                    variant="danger"
                    disabled={deleteState === "working"}
                    onClick={() => void deleteAccount()}
                  >
                    {deleteState === "working"
                      ? "Deleting…"
                      : "Yes, delete my account"}
                  </Button>
                  <Button
                    variant="quiet"
                    disabled={deleteState === "working"}
                    onClick={() => setConfirmingDelete(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="danger" onClick={() => setConfirmingDelete(true)}>
                  Delete my account
                </Button>
              )}
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
