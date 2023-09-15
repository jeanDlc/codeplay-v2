import { useEffect, useState, useRef } from "react";
import { createHtml } from "../utils/createHtml";
import { useEditorValuesStore } from "../store/useEditorValues";
import { EditorValues } from "../types/index.types";

export const usePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const values = useEditorValuesStore(({ values }) => values);

  const previewWindowRef = useRef<WeakRef<Window>>();

  const updatePreview = (values: EditorValues) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const htmlForPreview = createHtml(values);

    const blob = new Blob([htmlForPreview], { type: "text/html" });

    const newUrl = URL.createObjectURL(blob);

    if (previewWindowRef.current && previewWindowRef.current.deref()) {
      previewWindowRef.current.deref()!.location = newUrl;
    }

    setPreviewUrl(newUrl);
  };

  useEffect(() => {
    updatePreview(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const showPreview = () => {
    const previewWindow = window.open(previewUrl, "_blank");

    if (previewWindow) {
      previewWindowRef.current = new window.WeakRef(previewWindow);
      const title = `${document.title} | Preview`;
      previewWindow.document.title = title;
    }
  };

  return { showPreview, previewUrl };
};
