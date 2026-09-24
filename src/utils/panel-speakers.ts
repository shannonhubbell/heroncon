import { getEmDashEntry, type ContentEntry, type EmDashCollections } from "emdash";

const SPEAKER_FIELDS = ["speaker_1", "speaker_2", "speaker_3", "speaker_4"] as const;

type SpeakerData = EmDashCollections["speakers"];

/** Resolves a panel's speaker_1..speaker_4 reference fields into their speaker entries. */
export async function getPanelSpeakers(
	panel: ContentEntry<EmDashCollections["panels"]>,
): Promise<ContentEntry<SpeakerData>[]> {
	const ids = SPEAKER_FIELDS.map((field) => panel.data[field]).filter((id): id is string => Boolean(id));

	const speakers = await Promise.all(ids.map((id) => getEmDashEntry("speakers", id)));

	return speakers
		.map((result) => result.entry)
		.filter((entry): entry is ContentEntry<SpeakerData> => Boolean(entry));
}
