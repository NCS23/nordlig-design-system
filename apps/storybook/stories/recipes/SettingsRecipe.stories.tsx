import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  Switch,
  Button,
  Separator,
  Input,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Badge,
} from '@nordlig/components';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Einstellungsseite
   ═══════════════════════════════════════════════════════════════════════════ */

function SettingRow({ label, description, children }: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-[length:var(--font-text-base-size)] [font-weight:var(--font-text-medium-weight)]">
          {label}
        </p>
        {description && (
          <p className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)] mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="ml-4 shrink-0">{children}</div>
    </div>
  );
}

function SettingsPage() {
  const [theme, setTheme] = React.useState('system');
  const [notifications, setNotifications] = React.useState(true);
  const [emailDigest, setEmailDigest] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 className="text-xl font-semibold mb-4">Einstellungen</h1>

      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="darstellung">Darstellung</TabsTrigger>
          <TabsTrigger value="benachrichtigungen">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="gefahrenzone">
            Gefahrenzone <Badge variant="error" size="xs" className="ml-1">!</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil" className="mt-4">
          <Card elevation="raised">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar size="xl">
                  <AvatarFallback size="xl">NM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Nils Mustermann</p>
                  <p className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
                    nils@example.com
                  </p>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardBody className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
                  Anzeigename
                </label>
                <Input defaultValue="Nils Mustermann" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
                  E-Mail
                </label>
                <Input defaultValue="nils@example.com" type="email" />
              </div>
              <Button variant="primary" className="self-end mt-2">Speichern</Button>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="darstellung" className="mt-4">
          <Card elevation="raised">
            <CardBody>
              <SettingRow label="Theme" description="Waehle zwischen Hell, Dunkel oder System-Einstellung.">
                <Select
                  options={[
                    { value: 'light', label: 'Hell' },
                    { value: 'dark', label: 'Dunkel' },
                    { value: 'system', label: 'System' },
                  ]}
                  value={theme}
                  onChange={setTheme}
                  inputSize="sm"
                />
              </SettingRow>
              <Separator />
              <SettingRow label="Kompakte Ansicht" description="Reduziert Abstaende in Listen und Tabellen.">
                <Switch />
              </SettingRow>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="benachrichtigungen" className="mt-4">
          <Card elevation="raised">
            <CardBody>
              <SettingRow label="Push-Benachrichtigungen" description="Erhalte Benachrichtigungen im Browser.">
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </SettingRow>
              <Separator />
              <SettingRow label="Woechentlicher E-Mail-Report" description="Zusammenfassung deiner Aktivitaeten per E-Mail.">
                <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
              </SettingRow>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="gefahrenzone" className="mt-4">
          <Card elevation="raised" className="border-[var(--color-text-error)]">
            <CardBody>
              <SettingRow label="Konto loeschen" description="Alle Daten werden unwiderruflich geloescht.">
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Konto loeschen</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Konto wirklich loeschen?</DialogTitle>
                      <DialogDescription>
                        Diese Aktion kann nicht rueckgaengig gemacht werden. Alle Daten gehen verloren.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Abbrechen</Button>
                      <Button variant="primary" onClick={() => setDeleteOpen(false)}>Endgueltig loeschen</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </SettingRow>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const meta: Meta = {
  title: 'Recipes/Einstellungen',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Zeigt wie Tabs, Card, Switch, Select, Dialog und Input eine typische Settings-Seite aufbauen. ' +
          'Jeder Tab zeigt ein anderes UI-Muster: Profil-Bearbeitung, Toggle-Einstellungen und Bestaetigungs-Dialog.',
      },
    },
  },
};
export default meta;

export const Einstellungen: StoryObj = {
  render: () => <SettingsPage />,
};
